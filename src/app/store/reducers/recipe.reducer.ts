import { createReducer, on, Action, State } from '@ngrx/store'
import * as action from '../actions/recipe.actions'
import RecipeState, { initializeState } from '../states/recipe.state'
import Recipe from 'src/app/models/recipe.model'

export const initialState = initializeState()

const _recipeReducer = createReducer(
  initialState,
  on(action.SuccessGetRecipesAction, (state: RecipeState, { payload }) => {
    return { ...state, recipes: payload }
  }),
  on(action.SuccessGetRecipeAction, (state: RecipeState, recipe: Recipe) => {
    return {
      ...state,
      recipes: state.recipes.find(x => x.uuid === recipe.uuid)
        ? state.recipes.map(x => (x.uuid === recipe.uuid ? recipe : x))
        : [...state.recipes, recipe],
    }
  }),
  on(action.CreateRecipeSuccessAction, (state: RecipeState, props) => {
    return { ...state, recipes: [...state.recipes, props.recipe] }
  }),
  on(action.DeleteRecipeSuccessAction, (state: RecipeState, props) => {
    return {
      ...state,
      recipes: state.recipes.filter(r => r.uuid !== props.recipe_uuid),
    }
  }),

  on(
    action.UpdateRecipeSuccessAction,
    (state: RecipeState, props: { recipe: Recipe }) => {
      return {
        ...state,
        recipes: state.recipes.map(recipe =>
          recipe.uuid === props.recipe.uuid ? props.recipe : recipe,
        ),
      }
    },
  ),

  // INGREDIENTS

  on(action.GetIngredientSuccessAction, (state: RecipeState, props) => {
    const { ingredient } = props
    return {
      ...state,
      ingredients: state.ingredients.find(ing => ing.uuid === ingredient.uuid)
        ? state.ingredients.map(ing =>
            ing.uuid === ingredient.uuid ? ingredient : ing,
          )
        : [...state.ingredients, ingredient],
    }
  }),
  on(action.CreateIngredientSuccessAction, (state: RecipeState, props) => {
    return { ...state, ingredients: [...state.ingredients, props.ingredient] }
  }),
)

export function RecipeReducer(state: RecipeState | undefined, action: Action) {
  return _recipeReducer(state, action)
}
