import { createReducer, on, Action, State } from '@ngrx/store'
import * as action from '../actions/recipe.actions'
import RecipeState, { initializeState } from '../states/recipe.state'
import Recipe from 'src/app/models/recipe.model'

export const initialState = initializeState()

const _recipeReducer = createReducer(
  initialState,
  on(action.SuccessGetRecipesAction, (state: RecipeState, props) => {
    return { ...state, recipes: state.recipes.addPage(props.payload) }
  }),
  on(action.GetForChefSuccessAction, (state: RecipeState, props) => {
    return { ...state, chefRecipes: state.chefRecipes.addPage(props.payload) }
  }),
  on(action.SuccessGetRecipeAction, (state: RecipeState, recipe: Recipe) => {
    return {
      ...state,
      recipes: state.recipes.addOrUpdate(recipe),
    }
  }),
  on(action.CreateRecipeSuccessAction, (state: RecipeState, props) => {
    return {
      ...state,
      recipes: state.recipes.addOrUpdate(props.recipe),
      chefRecipes: state.chefRecipes.addOrUpdate(props.recipe),
    }
  }),
  on(action.DeleteRecipeSuccessAction, (state: RecipeState, props) => {
    return {
      ...state,
      recipes: state.recipes.delete(props.recipe_uuid),
      chefRecipes: state.recipes.delete(props.recipe_uuid),
    }
  }),

  on(
    action.UpdateRecipeSuccessAction,
    (state: RecipeState, props: { recipe: Recipe }) => {
      return {
        ...state,
        recipes: state.recipes.addOrUpdate(props.recipe),
        chefRecipes: state.recipes.addOrUpdate(props.recipe),
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
