import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment'
import IngredientCreateDto from '../models/DTO/ingredient-create.model'
import RecipeCreateDto from '../models/DTO/recipe-create.model'
import RecipeIngredientDto from '../models/DTO/recipe-ingredient.model'
import RecipeStepDto from '../models/DTO/recipe-step.model'

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  // ======== AUTHENTICATION ========
  public accessToken(username: string, password: string): Observable<any> {
    return this.http.post(`${environment.config.apiUrl}/token`, {
      username,
      password,
    })
  }
  public refreshToken(token: string): Observable<any> {
    return this.http.post<{ access: string }>(
      `${environment.config.apiUrl}/token/refresh`,
      {
        refresh: token,
      },
    )
  }

  public getMe(): Observable<any> {
    return this.http.get(`${environment.config.apiUrl}/users/me`)
  }

  // ======== RECIPES ========
  public getRecipes(): Observable<any> {
    return this.http.get(`${environment.config.apiUrl}/recipes`)
  }

  public getRecipe(uuid: string): Observable<any> {
    return this.http.get(`${environment.config.apiUrl}/recipes/${uuid}`)
  }

  public getRecipesForChef(chef_uuid: string): Observable<any> {
    return this.http.get(
      `${environment.config.apiUrl}/users/${chef_uuid}/recipes`,
    )
  }

  public createRecipe(recipe: RecipeCreateDto) {
    return this.http.post(
      `${environment.config.apiUrl}/recipes`,
      JSON.stringify(recipe),
    )
  }

  public deleteRecipe(recipe_uuid: string) {
    return this.http.delete(
      `${environment.config.apiUrl}/recipes/${recipe_uuid}`,
    )
  }

  public updateRecipeIngredients(
    recipe_uuid: string,
    ingredients: RecipeIngredientDto,
  ) {
    return this.http.put(
      `${environment.config.apiUrl}/recipes/${recipe_uuid}`,
      ingredients,
    )
  }

  public updateRecipeSteps(recipe_uuid: string, steps: RecipeStepDto) {
    return this.http.put(
      `${environment.config.apiUrl}/recipes/${recipe_uuid}`,
      steps,
    )
  }

  // ======== INGREDIENTS ========
  public searchIngredient(query: string) {
    return this.http.get(
      `${environment.config.apiUrl}/ingredients?search=${query}`,
    )
  }

  public getIngredient(uuid: string) {
    return this.http.get(`${environment.config.apiUrl}/ingredients/${uuid}`)
  }

  public createIngredient(ingredient: IngredientCreateDto) {
    return this.http.post(
      `${environment.config.apiUrl}/ingredients`,
      ingredient,
    )
  }

  // ======== CHEFS ========
  public getChef(uuid: string): Observable<any> {
    return this.http.get(`${environment.config.apiUrl}/users/${uuid}`)
  }
}
