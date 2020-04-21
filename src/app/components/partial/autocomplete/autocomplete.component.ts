import { Component, OnInit, Input, forwardRef } from '@angular/core'
import {
  FormControl,
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
} from '@angular/forms'
import { debounceTime, mergeMap, switchMap } from 'rxjs/operators'
import { Store, ActionsSubject } from '@ngrx/store'
import AppState from 'src/app/store/states/app.state'
import {
  SearchIngredientAction,
  SearchIngredientSuccessAction,
} from 'src/app/store/actions/recipe.actions'
import { ofType } from '@ngrx/effects'
import Ingredient from 'src/app/models/ingredient.model'

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.sass'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AutocompleteComponent),
      multi: true,
    },
  ],
})
export class AutocompleteComponent implements OnInit, ControlValueAccessor {
  @Input() placeholder: string = 'Start typing..'

  id = new FormControl(-1)
  query = new FormControl('')
  results: AutocompleteObject[] = []

  onChange: any = (val: any) => {}

  selectedValue = null

  constructor(
    private store: Store<AppState>,
    private actionsSubject: ActionsSubject,
  ) {}

  ngOnInit(): void {
    this.query.valueChanges.pipe(debounceTime(300)).subscribe(value => {
      if (!this.selectedValue && value && value.length >= 2)
        this.store.dispatch(SearchIngredientAction({ query: value }))
      else {
        this.selectedValue = null
      }
    })

    this.actionsSubject
      .pipe(ofType(SearchIngredientSuccessAction))
      .subscribe(
        (props: { ingredients: Ingredient[] }) =>
          (this.results = this.objectToAutocomplete(props.ingredients)),
      )
  }

  objectToAutocomplete(objects: Object[]): AutocompleteObject[] {
    return objects.map(obj => new AutocompleteObject(obj['id'], obj['name']))
  }

  setObject(obj: AutocompleteObject): void {
    this.id.setValue(obj.id)
    this.query.setValue(obj.value)
    this.selectedValue = obj
  }

  get value() {
    console.log(this.selectedValue)
    return this.selectedValue.id
  }

  writeValue(obj: any): void {
    console.log(obj)
    this.setObject(this.results.filter(r => r.id === obj)[0])
  }
  registerOnChange(fn: any): void {
    this.onChange = fn
  }
  registerOnTouched(fn: any): void {}
}

class AutocompleteObject {
  id: number
  value: string

  constructor(id, value) {
    this.id = id
    this.value = value
  }
}
