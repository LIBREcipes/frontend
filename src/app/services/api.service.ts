import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'

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
}
