import Recipe from 'src/app/models/recipe.model'

export default interface RecipeState {
  recipes: Recipe[]
}

export const initializeState = (): RecipeState => {
  return {
    recipes: [],
  }
}
