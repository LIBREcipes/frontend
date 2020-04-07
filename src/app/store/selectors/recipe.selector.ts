import { createSelector } from '@ngrx/store'
import { appRecipes } from './app.selector'
import RecipeState from '../states/recipe.state'

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
