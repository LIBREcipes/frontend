import Ingredient from './ingredient.model'

export default class RecipeIngredient {
    id: number
    ingredient: Ingredient
    amount: number
    unit: string
}