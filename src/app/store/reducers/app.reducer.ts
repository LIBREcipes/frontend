import { routerReducer } from '@ngrx/router-store'
import { ActionReducerMap } from '@ngrx/store'
import AppState from '../states/app.state'
import { AuthReducer } from './auth.reducer'
import { ChefReducer } from './chef.reducer'
import { RecipeReducer } from './recipe.reducer'

export const reducers: ActionReducerMap<AppState> = {
  auth: AuthReducer,
  recipes: RecipeReducer,
  chefs: ChefReducer,
}
