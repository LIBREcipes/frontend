import { createReducer, on, Action, State } from '@ngrx/store'
import * as action from '../actions/recipe.actions'
import RecipeState, { initializeState } from '../states/recipe.state'
import Recipe from 'src/app/models/recipe.model'

export const initialState = initializeState()

const _recipeReducer = createReducer(initialState,
    on(action.SuccessGetRecipesAction, (state: RecipeState, { payload }) => {
        return {...state, recipes: payload}
    }),
    on(action.CreateRecipeAction, (state: RecipeState, recipe: Recipe) => {
        return { ...state, recipes: [...state.recipes, recipe],}
    }),
)

export function RecipeReducer(state: RecipeState | undefined, action: Action) {
    return _recipeReducer(state, action)
}