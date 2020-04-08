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

export const selectChefRecipes = createSelector(
  appRecipes,
  (s: RecipeState, props: { chef_uuid: string }) =>
    props.chef_uuid
      ? s.recipes.filter(recipe => recipe.chef.uuid === props.chef_uuid)
      : s.recipes,
)
export const selectRecipe = createSelector(
  appRecipes,
  (s: RecipeState, props: { recipe_uuid: string }) =>
    s.recipes.find(recipe => recipe.uuid === props.recipe_uuid),
)

export const selectCurrentRecipe = createSelector(
  selectRecipes,
  (recipes, uuid: string) => recipes.find(r => r.uuid === uuid),
)
