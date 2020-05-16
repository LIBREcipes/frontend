import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import IngredientCreateDto from 'src/app/models/DTO/ingredient-create.model'
import { WithModal, WithDestroy } from 'src/app/mixins'
import {
  CreateIngredientAction,
  CreateIngredientSuccessAction,
  ErrorRecipeAction,
} from 'src/app/store/actions/recipe.actions'
import RecipeCreateDto from 'src/app/models/DTO/recipe-create.model'
import { Store, ScannedActionsSubject } from '@ngrx/store'
import AppState from 'src/app/store/states/app.state'
import { takeUntil, map } from 'rxjs/operators'
import { ofType } from '@ngrx/effects'

@Component({
  selector: 'app-ingredient-form',
  templateUrl: './ingredient-form.component.html',
  styleUrls: ['./ingredient-form.component.sass'],
})
export class IngredientFormComponent extends WithDestroy(WithModal(class {}))
  implements OnInit {
  @Output() formSubmit = new EventEmitter<IngredientCreateDto>()
  errorType = ErrorRecipeAction

  form: FormGroup

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    actionsSubject: ScannedActionsSubject,
  ) {
    super()

    actionsSubject
      .pipe(
        takeUntil(this.destroy$),
        ofType(CreateIngredientSuccessAction),
        map(props => props.ingredient),
      )
      .subscribe(ingredient => {
        this.closeModal.emit(ingredient)
      })
  }

  ngOnInit() {
    this.form = this.fb.group({
      name: [this.data.query, Validators.required],
    })
  }

  onSubmit() {
    this.isLoading.emit(true)
    const ingredient = <RecipeCreateDto>this.form.value
    this.store.dispatch(CreateIngredientAction({ ingredient }))
  }

  onModalSave() {
    this.onSubmit()
  }
}
