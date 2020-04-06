import { Injectable } from '@angular/core'
import { select, Store } from '@ngrx/store'
import { BehaviorSubject, Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import User from '../models/user.model'
import AuthState from '../store/states/auth.state'
import AppState from '../store/states/app.state'

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>
  public currentUser: Observable<User>

  static ITEM_USER = 'user'
  static ITEM_ACCESS_TOKEN = 'access_token'
  static ITEM_REFRESH_TOKEN = 'refresh_token'

  constructor(store: Store<AppState>) {
    const user: User = JSON.parse(
      localStorage.getItem(AuthenticationService.ITEM_USER),
    )

    this.currentUserSubject = new BehaviorSubject<User>(user)
    this.currentUser = this.currentUserSubject.asObservable()

    store
      .pipe(select('auth'))
      .pipe(
        map(x => {
          if (x.user) this.setUser(x.user)
        }),
      )
      .subscribe()
  }

  setAccessToken(accessToken: string) {
    if (accessToken === null) {
      localStorage.removeItem(AuthenticationService.ITEM_ACCESS_TOKEN)
    } else {
      localStorage.setItem(AuthenticationService.ITEM_ACCESS_TOKEN, accessToken)
    }
  }

  setRefreshToken(refreshToken: string) {
    if (refreshToken === null) {
      localStorage.removeItem(AuthenticationService.ITEM_REFRESH_TOKEN)
    } else {
      localStorage.setItem(
        AuthenticationService.ITEM_REFRESH_TOKEN,
        refreshToken,
      )
    }
  }

  private setUser(user: User | null): void {
    this.currentUserSubject.next(user)
    if (user) {
      localStorage.setItem(
        AuthenticationService.ITEM_USER,
        JSON.stringify(user),
      )
    } else {
      this.logout()
    }
  }

  getAccessToken(): string | null {
    return localStorage.getItem(AuthenticationService.ITEM_ACCESS_TOKEN)
  }

  getRefreshToken(): string | null {
    return localStorage.getItem(AuthenticationService.ITEM_REFRESH_TOKEN)
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value
  }

  isAuthenticated(): boolean {
    return this.currentUserSubject.value !== null
  }

  logout() {
    this.setAccessToken(null)
    this.setRefreshToken(null)
    localStorage.removeItem(AuthenticationService.ITEM_USER)
    this.currentUserSubject.next(null)
  }
}
