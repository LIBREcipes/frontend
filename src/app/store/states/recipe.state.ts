import Recipe from 'src/app/models/recipe.model'
import Ingredient from 'src/app/models/ingredient.model'

export default interface RecipeState {
  recipes: Recipe[]
  ingredients: Ingredient[]
}

export const initializeState = (): RecipeState => {
  return {
    recipes: [],
    ingredients: [],
  }
}
