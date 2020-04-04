import Recipe from 'src/app/models/recipe.model';

export default class RecipeState {
    recipes: Recipe[]
}

export const initializeState = (): RecipeState => {
    return {
        recipes: [],
    }
}