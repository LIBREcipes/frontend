import { RouterReducerState } from '@ngrx/router-store'
import { createFeatureSelector } from '@ngrx/store'
import AuthState from '../states/auth.state'
import ChefState from '../states/chef.state'
import RecipeState from '../states/recipe.state'

export const appRecipes = createFeatureSelector<RecipeState>('recipes')
export const appChefs = createFeatureSelector<ChefState>('chefs')
export const appAuth = createFeatureSelector<AuthState>('auth')
