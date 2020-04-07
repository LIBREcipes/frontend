import AuthState from './auth.state'
import RecipeState from './recipe.state'
import ChefState from './chef.state'

export default class AppState {
  auth: AuthState
  recipes: RecipeState
  chefs: ChefState
}
