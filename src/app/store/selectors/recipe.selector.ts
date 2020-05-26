import {
  createSelector,
  createSelectorFactory,
  createFeatureSelector,
} from '@ngrx/store'
import { appRecipes } from './app.selector'
import RecipeState from '../states/recipe.state'
import Recipe from 'src/app/models/recipe.model'

export const selectRecipes = createSelector(
  appRecipes,
  (s: RecipeState) => s.recipes,
)

export const selectMyRecipes = createSelector(
  appRecipes,
  (s: RecipeState) => s.chefRecipes,
)
export const selectRecipe = createSelector(
  appRecipes,
  (s: RecipeState, props: { recipe_uuid: string }) =>
    s.recipes.objects.find(recipe => recipe.uuid === props.recipe_uuid),
)

export const selectCurrentRecipe = createSelector(
  selectRecipes,
  (recipes, uuid: string) => recipes.objects.find(r => r.uuid === uuid),
)

export const selectIngredient = createSelector(
  appRecipes,
  (s: RecipeState, props: { ingredient_uuid: string }) =>
    s.ingredients.find(ing => ing.uuid === props.ingredient_uuid),
)
