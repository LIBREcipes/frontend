import AuthState from './auth.state'
import ChefState from './chef.state'
import RecipeState from './recipe.state'

export default class AppState {
  auth: AuthState
  recipes: RecipeState
  chefs: ChefState
}
