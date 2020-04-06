import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { Observable, of } from 'rxjs'
import { mergeMap, map, catchError } from 'rxjs/operators'
import * as authActions from '../actions/auth.actions'
import { Action } from '@ngrx/store'
import { AuthenticationService } from 'src/app/services/authentication.service'
import User from 'src/app/models/user.model'

@Injectable()
export class AuthEffects {
  constructor(
    private http: HttpClient,
    private action$: Actions,
    private authenticationService: AuthenticationService,
  ) {}

  private apiUrl: string = 'http://localhost:5000/api'

  GetToken$: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType(authActions.GetTokenAction),
      mergeMap((action) =>
        this.http
          .post(`${this.apiUrl}/token`, {
            username: action.username,
            password: action.password,
          })
          .pipe(
            map((data: { access: string; refresh: string }) => {
              this.authenticationService.setTokens(data)

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
      mergeMap((action) =>
        this.http.get(`${this.apiUrl}/users/me`).pipe(
          map((data: User) => {
            this.authenticationService.setUser(data)

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
}
