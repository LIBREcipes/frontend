import Autocompletable, { AutocompleteObject } from './autocompletable.model'
import { Store } from '@ngrx/store'
import AppState from '../store/states/app.state'
import { Observable } from 'rxjs'
import {
  SearchIngredientAction,
  SearchIngredientSuccessAction,
} from '../store/actions/recipe.actions'

export default class Ingredient {
  id: number
  uuid: string
  name: string
  // brand: Brand
  language: string
  barcode: string
  default_unit: string

  calories: number
  fat: number
  fat_saturated: number
  carbs: number
  carbs_sugar: number
  proteine: number

  static toAutocomplete(ingredient: Ingredient): AutocompleteObject {
    return new AutocompleteObject(ingredient.uuid, ingredient.name)
  }
}
