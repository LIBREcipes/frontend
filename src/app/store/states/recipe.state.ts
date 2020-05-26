import Recipe from 'src/app/models/recipe.model'
import Ingredient from 'src/app/models/ingredient.model'
import Page from 'src/app/models/page.model'
import { environment } from 'src/environments/environment'

export default interface RecipeState {
  recipes: Page<Recipe>
  chefRecipes: Page<Recipe>
  ingredients: Ingredient[]
}

export const initializeState = (): RecipeState => {
  return {
    recipes: new Page<Recipe>(),
    chefRecipes: new Page<Recipe>(),
    ingredients: [],
  }
}
