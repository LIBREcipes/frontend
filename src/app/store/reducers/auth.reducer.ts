import { Action, createReducer, on } from '@ngrx/store'
import * as action from '../actions/auth.actions'
import AuthState, { initializeState } from '../states/auth.state'

export const initialState = initializeState()

const _authReducer = createReducer(
  initialState,
  on(action.GetTokenSuccessAction, (state: AuthState, { accessToken }) => {
    return { ...state, accessToken: accessToken }
  }),
  on(action.LoginSuccessAction, (state: AuthState, { accessToken, user }) => {
    return { ...state, user: user, accessToken: accessToken }
  }),
  on(action.LogoutSuccessAction, (state: AuthState) => {
    return initialState
  }),
)

export function AuthReducer(state: AuthState | undefined, action: Action) {
  return _authReducer(state, action)
}
