import User from 'src/app/models/user.model'

export default class ChefState {
  chefs: User[]
}

export const initializeState = (): ChefState => {
  return {
    chefs: [],
  }
}
