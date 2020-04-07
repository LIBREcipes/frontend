import { createAction, props } from '@ngrx/store'
import User from 'src/app/models/user.model'

export const ErrorAction = createAction('CHEF - error', props<Error>())

export const GetChefAction = createAction(
  'CHEF - get',
  props<{ uuid: string }>(),
)
export const GetChefSuccessAction = createAction(
  'CHEF - get succeeded',
  props<{ chef: User }>(),
)
