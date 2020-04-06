import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable, Subscription, Subject } from 'rxjs'
import User from '../models/user.model'
import { HttpClient } from '@angular/common/http'
import { map, tap } from 'rxjs/operators'
import AuthState from '../store/states/auth.state'
import { Store, select } from '@ngrx/store'

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private auth$: Observable<AuthState>
  private authSubscription: Subscription

  private currentUser: User
  isAuthenticatedSubject = new Subject<boolean>()

  constructor(store: Store<{ auth: AuthState }>) {
    this.auth$ = store.pipe(select('auth'))
    this.authSubscription = this.auth$
      .pipe(
        tap((x) => {
          this.currentUser = x.user
          this.isAuthenticatedSubject.next(x.user !== null)
        }),
      )
      .subscribe()
  }

  setTokens(tokens: { access: string; refresh: string } | null) {
    if (tokens === null) {
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
      localStorage.removeItem('uuid')
    } else {
      localStorage.setItem('access_token', tokens.access)
      localStorage.setItem('refresh_token', tokens.refresh)
      this.setUuidFromAccessToken(tokens.access)
    }
  }

  getAccessToken(): string | null {
    return localStorage.getItem('access_token')
  }

  setUser(user: User) {
    console.log(user)
  }

  getUser(): User {
    return this.currentUser
  }

  isAuthenticated(): boolean {
    return this.currentUser !== null && this.getAccessToken !== null
  }

  getUuid(): string | null {
    return localStorage.getItem('uuid')
  }

  private setUuidFromAccessToken(token: string) {
    const uuid: string = JSON.parse(atob(token.split('.')[1]))['uuid']
    if (uuid) {
      localStorage.setItem('uuid', uuid)
    }
  }

  logout() {
    this.setTokens(null)
    this.isAuthenticatedSubject.next(false)
  }
}
