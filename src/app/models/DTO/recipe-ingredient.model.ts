import { Identifiers } from '@angular/compiler'
import Recipe from '../recipe.model'

export default class RecipeIngredientDto {
  ingredients: {
    amount: number
    unit: string
    ingredient_uuid: string
    id: number
  }[]

  static fromFormValue(form): RecipeIngredientDto {
    for (let ing of form.ingredients) {
      if (!ing.id) {
        delete ing.id
      }

      if (ing.hasOwnProperty('collapsed')) delete ing['collapsed']
    }

    return form as RecipeIngredientDto
  }
}
