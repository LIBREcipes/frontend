import User from 'src/app/models/user.model'

export default interface ChefState {
  chefs: User[]
}

export const initializeState = (): ChefState => {
  return {
    chefs: [],
  }
}
