import { createAction, props } from '@ngrx/store'
import Recipe from 'src/app/models/recipe.model'

export const ErrorRecipeAction = createAction('RECIPE - error', props<Error>())

export const GetRecipesAction = createAction('RECIPE - get all')
export const SuccessGetRecipesAction = createAction(
  'RECIPE - get all succeeded',
  props<{ payload: Recipe[] }>(),
)

export const GetRecipeAction = createAction(
  'RECIPE - get',
  props<{ uuid: string }>(),
)
export const SuccessGetRecipeAction = createAction(
  'RECIPE - get succeeded',
  props<Recipe>(),
)

export const GetForChefAction = createAction(
  'RECIPE - get for chef',
  props<{ chef_uuid: string }>(),
)
export const GetForChefSuccessAction = createAction(
  'RECIPE - get for chef succeeded',
  props<{ recipes: Recipe[] }>(),
)

export const CreateRecipeAction = createAction(
  'RECIPE - create',
  props<Recipe>(),
)
