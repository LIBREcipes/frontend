import { createAction, props } from '@ngrx/store'
import Recipe from 'src/app/models/recipe.model'

export const ErrorRecipeAction = createAction('RECIPE - error', props<Error>())


export const GetRecipesAction = createAction('RECIPE - get all')
export const SuccessGetRecipesAction = createAction(
    'RECIPE - get all succeeded',
    props<{ payload: Recipe[] }>(),
)

export const GetRecipeAction = createAction('RECIPE - get', props<{ payload: number}>())
export const SuccessGetRecipeAction = createAction(
    'RECIPE - get succeeded',
    props<Recipe>(),
)

export const CreateRecipeAction = createAction('RECIPE - create', props<Recipe>())