import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { Action } from '@ngrx/store'
import { Observable, of } from 'rxjs'
import { catchError, map, mergeMap } from 'rxjs/operators'
import User from 'src/app/models/user.model'
import { AuthenticationService } from 'src/app/services/authentication.service'
import * as authActions from '../actions/auth.actions'
import { ApiService } from 'src/app/services/api.service'

@Injectable()
export class AuthEffects {
  constructor(
    private apiService: ApiService,
    private action$: Actions,
    private authenticationService: AuthenticationService,
  ) {}

  private apiUrl: string = 'http://localhost:5000/api'

  GetToken$: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType(authActions.GetTokenAction),
      mergeMap(action =>
        this.apiService.accessToken(action.username, action.password).pipe(
          map((data: { access: string; refresh: string }) => {
            this.authenticationService.setAccessToken(data.access)
            this.authenticationService.setRefreshToken(data.refresh)

            return authActions.GetMeAction({
              accessToken: data.access,
            })
          }),
          catchError((error: Error) => {
            console.log(error)
            return of(authActions.ErrorAuthAction(error))
          }),
        ),
      ),
    ),
  )

  GetMe$: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType(authActions.GetMeAction),
      mergeMap(action =>
        this.apiService.getMe().pipe(
          map((data: User) => {
            return authActions.LoginSuccessAction({
              accessToken: action.accessToken,
              user: data,
            })
          }),
          catchError((error: Error) => {
            console.log(error)
            return of(authActions.ErrorAuthAction(error))
          }),
        ),
      ),
    ),
  )

  Logout$: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType(authActions.LogoutAction),
      map(_ => {
        this.authenticationService.logout()

        return authActions.LogoutSuccessAction()
      }),
    ),
  )
}
