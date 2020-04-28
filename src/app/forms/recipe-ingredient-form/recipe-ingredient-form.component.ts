import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { FormArray, FormBuilder, FormGroup } from '@angular/forms'
import { Store } from '@ngrx/store'
import RecipeIngredientDto from 'src/app/models/DTO/recipe-ingredient.model'
import RecipeIngredient from 'src/app/models/recipe-ingredient.model'
import AppState from 'src/app/store/states/app.state'
import { ErrorRecipeAction } from 'src/app/store/actions/recipe.actions'

@Component({
  selector: 'app-recipe-ingredient-form',
  templateUrl: './recipe-ingredient-form.component.html',
  styleUrls: ['./recipe-ingredient-form.component.sass'],
})
export class RecipeIngredientFormComponent implements OnInit {
  @Input() initial: RecipeIngredient[]
  @Output() formsubmit = new EventEmitter<RecipeIngredientDto>()
  ingredientForm = this.fb.group({
    ingredients: this.fb.array([]),
  })
  errorType = ErrorRecipeAction

  constructor(private store: Store<AppState>, private fb: FormBuilder) {}

  ngOnInit(): void {
    for (let ing of this.initial) {
      this.ingredients.push(
        this.getForm(ing.id, ing.amount, ing.unit, ing.ingredient.uuid),
      )
    }

    if (this.initial.length === 0) this.addForm()
  }

  get ingredients(): FormArray {
    return this.ingredientForm.get('ingredients') as FormArray
  }

  private getForm(
    id: number = null,
    amount: number = 0,
    unit: string = '',
    ingredient_uuid: string = null,
  ): FormGroup {
    return this.fb.group({
      id: [id],
      amount: [amount],
      unit: [unit],
      ingredient_uuid: [ingredient_uuid],
    })
  }

  addForm() {
    this.ingredients.push(this.getForm())
  }
  removeForm(index) {
    this.ingredients.removeAt(index)
  }

  onSubmit() {
    this.formsubmit.emit(
      !this.ingredientForm.dirty && !this.ingredientForm.touched
        ? null
        : RecipeIngredientDto.fromFormValue(this.ingredientForm.value),
    )
  }
}
