import { Component, OnInit, Output, EventEmitter } from '@angular/core'
import { FormBuilder, FormArray, FormGroup } from '@angular/forms'
import { Store } from '@ngrx/store'
import AppState from 'src/app/store/states/app.state'
import RecipeCreateDto from 'src/app/models/DTO/recipe-create.model'
import { CreateRecipeAction } from 'src/app/store/actions/recipe.actions'

@Component({
  selector: 'app-recipe-create-form',
  templateUrl: './recipe-create-form.component.html',
  styleUrls: ['./recipe-create-form.component.sass'],
})
export class RecipeCreateFormComponent implements OnInit {
  @Output() formSubmit = new EventEmitter()

  recipeForm = this.fb.group({
    name: [''],
    description: [''],
    is_public: [false],
    portion_size: [1],
    portion_type: ['portion'],
    image: [null],
  })

  constructor(private store: Store<AppState>, private fb: FormBuilder) {}

  ngOnInit(): void {}

  onSubmit(): void {
    this.formSubmit.emit(<RecipeCreateDto>this.recipeForm.value)
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
