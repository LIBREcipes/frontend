import User from './user.model'
import RecipeIngredient from './recipe-ingredient.model'

export default class Recipe {
    id: number
    uuid: string
    name: string
    chef: User
    ingredients: RecipeIngredient[]
    language: string
    created_date: Date
    modified_date: Date
    image: Object
    is_public: boolean
}