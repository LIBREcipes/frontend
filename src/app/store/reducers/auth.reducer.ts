import { createReducer, on, Action, State } from '@ngrx/store'
import * as action from '../actions/auth.actions'
import AuthState, { initializeState } from '../states/auth.state'

export const initialState = initializeState()

const _authReducer = createReducer(
  initialState,
  on(action.GetTokenSuccessAction, (state: AuthState, { accessToken }) => {
    return { ...state, accessToken }
  }),
  on(action.LoginSuccessAction, (state: AuthState, { accessToken, user }) => {
    return { ...state, user, accessToken }
  }),
)

export function AuthReducer(state: AuthState | undefined, action: Action) {
  return _authReducer(state, action)
}
