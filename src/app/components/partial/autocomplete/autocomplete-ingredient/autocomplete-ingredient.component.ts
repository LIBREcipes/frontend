import {
  Component,
  forwardRef,
  OnInit,
  OnDestroy,
  Output,
  EventEmitter,
} from '@angular/core'
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  FormControl,
} from '@angular/forms'
import { Subject } from 'rxjs'
import { takeUntil, debounceTime, map, take, filter, tap } from 'rxjs/operators'
import { Store, ActionsSubject, select } from '@ngrx/store'
import AppState from 'src/app/store/states/app.state'
import {
  SearchIngredientAction,
  SearchIngredientSuccessAction,
  GetIngredientSuccessAction,
  GetIngredientAction,
} from 'src/app/store/actions/recipe.actions'
import { ofType } from '@ngrx/effects'
import Ingredient from 'src/app/models/ingredient.model'
import { AutocompleteObject } from 'src/app/models/autocompletable.model'
import { selectIngredient } from 'src/app/store/selectors/recipe.selector'
import { ModalService } from 'src/app/components/modals/modal.service'
import { IngredientFormComponent } from 'src/app/forms/ingredient-form/ingredient-form.component'
import { WithDestroy } from 'src/app/mixins'

@Component({
  selector: 'app-autocomplete-ingredient',
  templateUrl: './autocomplete-ingredient.component.html',
  styleUrls: ['./autocomplete-ingredient.component.sass'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AutocompleteIngredientComponent),
      multi: true,
    },
  ],
})
export class AutocompleteIngredientComponent extends WithDestroy()
  implements OnInit, ControlValueAccessor {
  query = new FormControl('')
  results: AutocompleteObject[] = []
  selectedValue: AutocompleteObject = null
  ongChangeFn = (val: string) => {}
  showAddOption = false

  constructor(
    private store: Store<AppState>,
    private actionsSubject: ActionsSubject,
    private modalService: ModalService,
  ) {
    super()
  }
  ngOnInit(): void {
    // listen for query changes
    this.query.valueChanges
      .pipe(takeUntil(this.destroy$), debounceTime(300))
      .subscribe(value => {
        if (!this.selectedValue || value !== this.selectedValue.value)
          this.store.dispatch(SearchIngredientAction({ query: value }))
      })

    // listen for results
    this.actionsSubject
      .pipe(
        takeUntil(this.destroy$),
        ofType(SearchIngredientSuccessAction),
        map(props => props.ingredients),
        map(ingredients => {
          this.showAddOption = true
          return ingredients.map<AutocompleteObject>(i => {
            if (i.name.toLowerCase() === this.query.value.toLowerCase())
              this.showAddOption = false
            return Ingredient.toAutocomplete(i)
          })
        }),
      )
      .subscribe((results: AutocompleteObject[]) => (this.results = results))
  }

  isActive(): boolean {
    if (this.selectedValue === null) return this.query.value.length > 2

    return this.selectedValue.value !== this.query.value
  }

  selectAutocompleteObject(option: AutocompleteObject) {
    this.selectedValue = option
    this.query.setValue(option.value)
    this.ongChangeFn(option.id)
  }

  writeValue(ingredient_uuid: string): void {
    if (!ingredient_uuid) return

    const ingredientfound = new Subject<boolean>()
    this.store
      .pipe(select(selectIngredient, { ingredient_uuid }))
      .pipe(takeUntil(ingredientfound))
      .subscribe(ingredient => {
        if (ingredient) {
          this.selectAutocompleteObject(Ingredient.toAutocomplete(ingredient))
          ingredientfound.next(true)
        } else {
          this.store.dispatch(GetIngredientAction({ ingredient_uuid }))
        }
      })
  }
  registerOnChange(fn: any): void {
    this.ongChangeFn = fn
  }
  registerOnTouched(fn: any): void {}
  setDisabledState?(isDisabled: boolean): void {}

  createIngredient(query: string): void {
    this.modalService
      .showIngredientForm(query)
      .pipe(
        filter(data => data !== null),
        take(1),
      )
      .subscribe(ingredient =>
        this.selectAutocompleteObject(Ingredient.toAutocomplete(ingredient)),
      )
  }

  get value() {
    return this.selectedValue ? this.selectedValue.id : null
  }
}
