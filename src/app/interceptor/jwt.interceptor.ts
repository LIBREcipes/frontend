import { Injectable } from '@angular/core'
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http'
import { Observable, BehaviorSubject, throwError } from 'rxjs'
import { AuthenticationService } from '../services/authentication.service'
import { catchError, take, filter, switchMap } from 'rxjs/operators'
import { ApiService } from '../services/api.service'

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  private tokenRefreshInProgress = false
  private refreshTokenSubject = new BehaviorSubject<any>(null)

  constructor(
    private authenticationService: AuthenticationService,
    private apiService: ApiService,
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    return next.handle(this.addAccessToken(request)).pipe(
      catchError(error => {
        if (
          request.url.includes('/token') ||
          request.url.includes('/token/refresh')
        ) {
          if (request.url.includes('/token/refresh'))
            this.authenticationService.logout()
          return throwError(error)
        }

        if (error.status !== 401) return throwError(error)

        if (this.tokenRefreshInProgress) {
          return this.refreshTokenSubject.pipe(
            filter(x => x !== null),
            take(1),
            switchMap(() => next.handle(request)),
          )
        }

        return this.apiService
          .refreshToken(this.authenticationService.getRefreshToken())
          .pipe(
            switchMap(data => {
              this.tokenRefreshInProgress = false
              this.refreshTokenSubject.next(data.access)
              this.authenticationService.setAccessToken(data.access)

              return next.handle(this.addAccessToken(request))
            }),
            catchError(err => {
              this.tokenRefreshInProgress = false
              this.authenticationService.logout()
              return throwError(err)
            }),
          )
      }),
    )
  }

  addAccessToken(request): HttpRequest<unknown> {
    let accessToken = this.authenticationService.getAccessToken()

    if (accessToken) {
      return request.clone({
        setHeaders: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      })
    }

    return request
  }
}
