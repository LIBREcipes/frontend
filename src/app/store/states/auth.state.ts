import Recipe from 'src/app/models/recipe.model'
import User from 'src/app/models/user.model'

export default class AuthState {
  accesToken: string
  user: User
}

export const initializeState = (): AuthState => {
  return {
    accesToken: null,
    user: null,
  }
}
