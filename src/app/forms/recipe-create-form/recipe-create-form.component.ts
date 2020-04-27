import { Component, EventEmitter, OnInit, Output } from '@angular/core'
import { FormArray, FormBuilder, FormGroup } from '@angular/forms'
import { ofType } from '@ngrx/effects'
import { ScannedActionsSubject, Store } from '@ngrx/store'
import { takeUntil } from 'rxjs/operators'
import { WithDestroy } from 'src/app/mixins'
import RecipeCreateDto from 'src/app/models/DTO/recipe-create.model'
import {
  CreateRecipeAction,
  CreateRecipeSuccessAction,
  CreateRecipeWithFileAction,
} from 'src/app/store/actions/recipe.actions'
import AppState from 'src/app/store/states/app.state'

@Component({
  selector: 'app-recipe-create-form',
  templateUrl: './recipe-create-form.component.html',
  styleUrls: ['./recipe-create-form.component.sass'],
  inputs: ['data'],
})
export class RecipeCreateFormComponent extends WithDestroy() implements OnInit {
  @Output() recipeCreated = new EventEmitter()

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
      .pipe(takeUntil(this.destroy$), ofType(CreateRecipeSuccessAction))
      .subscribe(recipe => this.recipeCreated.emit(recipe))
  }

  ngOnInit(): void {}

  onSubmit(): void {
    const recipe = <RecipeCreateDto>this.recipeForm.value
    if (recipe.image)
      this.store.dispatch(CreateRecipeWithFileAction({ recipe }))
    else this.store.dispatch(CreateRecipeAction({ recipe }))
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
}
