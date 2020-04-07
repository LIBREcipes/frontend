import { Action, createReducer, on } from '@ngrx/store'
import * as action from '../actions/chef.actions'
import ChefState, { initializeState } from '../states/chef.state'

export const initialState = initializeState()

const _reducer = createReducer(
  initialState,
  on(action.GetChefSuccessAction, (state: ChefState, { chef }) => {
    return { ...state, chefs: [...state.chefs, chef] }
  }),
)

export function ChefReducer(state: ChefState | undefined, action: Action) {
  return _reducer(state, action)
}
