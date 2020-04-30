import { Component, EventEmitter, OnInit, Output } from '@angular/core'
import { FormArray, FormBuilder, FormGroup } from '@angular/forms'
import { ofType } from '@ngrx/effects'
import { ScannedActionsSubject, Store } from '@ngrx/store'
import { takeUntil, map } from 'rxjs/operators'
import { WithDestroy, WithModal } from 'src/app/mixins'
import RecipeCreateDto from 'src/app/models/DTO/recipe-create.model'
import RecipeEditDto from 'src/app/models/DTO/recipe-edit.model'
import {
  CreateRecipeAction,
  CreateRecipeSuccessAction,
  CreateRecipeWithFileAction,
  UpdateRecipeAction,
  UpdateRecipeWithFileAction,
  UpdateRecipeSuccessAction,
  ErrorRecipeAction,
} from 'src/app/store/actions/recipe.actions'
import AppState from 'src/app/store/states/app.state'

@Component({
  selector: 'app-recipe-create-form',
  templateUrl: './recipe-create-form.component.html',
  styleUrls: ['./recipe-create-form.component.sass'],
  inputs: ['data'],
  outputs: ['cancel'],
})
export class RecipeCreateFormComponent extends WithDestroy(WithModal(class {}))
  implements OnInit {
  @Output() recipeCreated = new EventEmitter()
  errorType = ErrorRecipeAction

  recipeForm = this.fb.group({
    name: [''],
    description: [''],
    is_public: [false],
    portion_size: [1],
    portion_type: ['portion'],
    image: [null],
  })

  constructor(
    private store: Store<AppState>,
    private fb: FormBuilder,
    actionsSubject: ScannedActionsSubject,
  ) {
    super()
    actionsSubject
      .pipe(
        takeUntil(this.destroy$),
        ofType(CreateRecipeSuccessAction, UpdateRecipeSuccessAction),
        map(props => props.recipe),
      )
      .subscribe(recipe => {
        this.isModal
          ? this.closeModal.emit(recipe)
          : this.recipeCreated.emit(recipe)
      })
  }

  ngOnInit(): void {}

  onSubmit(): void {
    this.isLoading.emit(true)
    if (this.recipeForm.value.uuid) {
      const recipe = new RecipeEditDto(this.recipeForm.value)
      if (recipe.image)
        this.store.dispatch(UpdateRecipeWithFileAction({ recipe }))
      else this.store.dispatch(UpdateRecipeAction({ recipe }))
    } else {
      const recipe = <RecipeCreateDto>this.recipeForm.value
      if (recipe.image)
        this.store.dispatch(CreateRecipeWithFileAction({ recipe }))
      else this.store.dispatch(CreateRecipeAction({ recipe }))
    }
  }

  get ingredients() {
    return this.recipeForm.get('ingredients') as FormArray
  }

  private getIngredientForm(): FormGroup {
    return this.fb.group({
      amount: [0],
      unit: ['g'],
      ingredient: [null],
    })
  }

  addIngredientForm() {
    const items = this.ingredients
    items.push(this.getIngredientForm())
  }

  removeIngredientForm(index) {
    this.ingredients.removeAt(index)
  }

  get steps(): FormArray {
    return this.recipeForm.get('steps') as FormArray
  }

  private getStepsForm(): FormGroup {
    return this.fb.group({
      step: [0],
      description: [''],
    })
  }

  addStepsForm() {
    this.steps.push(this.getStepsForm())
  }

  removeStepsForm(index) {
    this.steps.removeAt(index)
  }

  // MODALABLE
  onModalSave(): void {
    this.onSubmit()
  }

  initModal(): void {
    super.initModal()
    const { recipe } = this.data
    this.recipeForm = this.fb.group({
      uuid: [recipe.uuid],
      name: [recipe.name],
      description: [recipe.description],
      is_public: [recipe.is_public],
      portion_size: [recipe.portion_size],
      portion_type: [recipe.portion_type],
      image: [recipe.image],
    })
  }
}
