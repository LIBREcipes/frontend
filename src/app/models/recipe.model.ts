import User from './user.model'
import RecipeIngredient from './recipe-ingredient.model'
import RecipeStep from './recipe-step.model'

export default class Recipe {
  id: number
  uuid: string
  name: string
  chef: User
  description: string
  ingredients: RecipeIngredient[]
  steps: RecipeStep[]
  language: string
  created_date: Date
  modified_date: Date
  image: string

  portion_size: number
  portion_type: string

  is_public: boolean
}
