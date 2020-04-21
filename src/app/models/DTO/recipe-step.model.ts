import { Identifiers } from '@angular/compiler'
import Recipe from '../recipe.model'

export default class RecipeStepDto {
  steps: {
    id: number
    description: string
    step: number
  }[]

  static fromFormValue(form): RecipeStepDto {
    let index = 1
    for (let step of form.steps) {
      step.step = index++

      if (!step.id) {
        delete step.id
      }
    }

    return form as RecipeStepDto
  }
}
