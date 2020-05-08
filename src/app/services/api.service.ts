import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment'
import IngredientCreateDto from '../models/DTO/ingredient-create.model'
import RecipeCreateDto from '../models/DTO/recipe-create.model'
import RecipeIngredientDto from '../models/DTO/recipe-ingredient.model'
import RecipeStepDto from '../models/DTO/recipe-step.model'
import RecipeEditDto from '../models/DTO/recipe-edit.model'
import UserCreateDto from '../models/DTO/user-create.model'

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  toFormData<T>(obj: T): FormData {
    const formData = new FormData()

    for (const key in Object.keys(obj)) {
      const value = obj[key]
      formData.append(key, value)
    }

    return formData
  }

  private customOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  }

  private get(path: string) {
    return this.http.get(
      `${environment.config.apiUrl}/${path}`,
      this.customOptions,
    )
  }

  private post(path: string, body) {
    return this.http.post(
      `${environment.config.apiUrl}/${path}`,
      body,
      this.customOptions,
    )
  }

  private put(path: string, body) {
    return this.http.put(
      `${environment.config.apiUrl}/${path}`,
      body,
      this.customOptions,
    )
  }

  private delete(path: string) {
    return this.http.delete(
      `${environment.config.apiUrl}/${path}`,
      this.customOptions,
    )
  }

  // ======== AUTHENTICATION ========
  public accessToken(username: string, password: string): Observable<any> {
    return this.post('token', { username, password })
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
    return this.get('users/me')
  }

  public createUser(user: UserCreateDto) {
    return this.post('users', user)
  }

  public requestPasswordReset(email: string) {
    return this.post('auth/password-reset-request', { email })
  }

  // ======== FILES =========
  public uploadFile(file) {
    const formData = new FormData()
    formData.append('file', file)

    return this.http.post(`${environment.config.apiUrl}/files`, formData)
  }

  // ======== RECIPES ========
  public getRecipes(): Observable<any> {
    return this.get('recipes')
  }

  public getRecipe(uuid: string): Observable<any> {
    return this.get(`recipes/${uuid}`)
  }

  public getRecipesForChef(chef_uuid: string): Observable<any> {
    return this.get(`users/${chef_uuid}/recipes`)
  }

  public createRecipe(recipe: RecipeCreateDto) {
    return this.post(`recipes`, recipe)
  }

  public deleteRecipe(recipe_uuid: string) {
    return this.delete(`recipes/${recipe_uuid}`)
  }

  public updateRecipe(recipe: RecipeEditDto) {
    return this.put(`recipes/${recipe.uuid}`, recipe)
  }

  public updateRecipeIngredients(
    recipe_uuid: string,
    ingredients: RecipeIngredientDto,
  ) {
    return this.put(`recipes/${recipe_uuid}`, ingredients)
  }

  public updateRecipeSteps(recipe_uuid: string, steps: RecipeStepDto) {
    return this.put(`recipes/${recipe_uuid}`, steps)
  }

  // ======== INGREDIENTS ========
  public searchIngredient(query: string) {
    return this.get(`ingredients?search=${query}`)
  }

  public getIngredient(uuid: string) {
    return this.get(`ingredients/${uuid}`)
  }

  public createIngredient(ingredient: IngredientCreateDto) {
    return this.post(`ingredients`, ingredient)
  }

  // ======== CHEFS ========
  public getChef(uuid: string): Observable<any> {
    return this.get(`users/${uuid}`)
  }
}
