import { createAction, props } from '@ngrx/store'
import User from 'src/app/models/user.model'
import DjangoError from 'src/app/models/django-error.model'
import UserCreateDto from 'src/app/models/DTO/user-create.model'

export const ErrorAuthAction = createAction('AUTH - error', props<Error>())

export const GetTokenAction = createAction(
  'AUTH - get token',
  props<{ username: string; password: string }>(),
)
export const GetTokenSuccessAction = createAction(
  'AUTH - get token succeeded',
  props<{ accessToken: string }>(),
)

export const GetMeAction = createAction(
  'AUTH - get me',
  props<{ accessToken: string }>(),
)

export const LoginSuccessAction = createAction(
  'AUTH - login complete',
  props<{ accessToken: string; user: User }>(),
)
export const LoginErrorAction = createAction(
  'AUTH - login failed',
  props<DjangoError>(),
)

export const CreateUserAction = createAction(
  'AUTH - create user',
  props<{ user: UserCreateDto }>(),
)
export const CreateUserSuccessAction = createAction(
  'AUTH - create user succeeded',
  props<{ user: User }>(),
)

export const LogoutAction = createAction('AUTH - logout')
export const LogoutSuccessAction = createAction('AUTH - logout successful')
