import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import Recipe from '../models/recipe.model'
import RecipeCreateDto from '../models/DTO/recipe-create.model'
import RecipeIngredientDto from '../models/DTO/recipe-ingredient.model'
import RecipeStepDto from '../models/DTO/recipe-step.model'

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  API_URL = 'http://localhost:5000/api'

  constructor(private http: HttpClient) {}

  // ======== AUTHENTICATION ========
  public accessToken(username: string, password: string): Observable<any> {
    return this.http.post(`${this.API_URL}/token`, {
      username,
      password,
    })
  }
  public refreshToken(token: string): Observable<any> {
    return this.http.post<{ access: string }>(`${this.API_URL}/token/refresh`, {
      refresh: token,
    })
  }

  public getMe(): Observable<any> {
    return this.http.get(`${this.API_URL}/users/me`)
  }

  // ======== RECIPES ========
  public getRecipes(): Observable<any> {
    return this.http.get(`${this.API_URL}/recipes`)
  }

  public getRecipe(uuid: string): Observable<any> {
    return this.http.get(`${this.API_URL}/recipes/${uuid}`)
  }

  public getRecipesForChef(chef_uuid: string): Observable<any> {
    return this.http.get(`${this.API_URL}/users/${chef_uuid}/recipes`)
  }

  public createRecipe(recipe: RecipeCreateDto) {
    return this.http.post(`${this.API_URL}/recipes`, JSON.stringify(recipe))
  }

  public deleteRecipe(recipe_uuid: string) {
    return this.http.delete(`${this.API_URL}/recipes/${recipe_uuid}`)
  }

  public updateRecipeIngredients(
    recipe_uuid: string,
    ingredients: RecipeIngredientDto,
  ) {
    return this.http.put(`${this.API_URL}/recipes/${recipe_uuid}`, ingredients)
  }

  public updateRecipeSteps(recipe_uuid: string, steps: RecipeStepDto) {
    return this.http.put(`${this.API_URL}/recipes/${recipe_uuid}`, steps)
  }

  // ======== INGREDIENTS ========
  public searchIngredient(query: string) {
    return this.http.get(`${this.API_URL}/ingredients?search=${query}`)
  }

  public getIngredient(uuid: string) {
    return this.http.get(`${this.API_URL}/ingredients/${uuid}`)
  }

  // ======== CHEFS ========
  public getChef(uuid: string): Observable<any> {
    return this.http.get(`${this.API_URL}/users/${uuid}`)
  }
}
