import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Store } from '@ngrx/store'
import { Observable, Subject } from 'rxjs'
import { AuthenticationService } from 'src/app/services/authentication.service'
import AuthState from 'src/app/store/states/auth.state'
import * as authActions from '../../../store/actions/auth.actions'
import AppState from 'src/app/store/states/app.state'
import { tap, takeUntil, map } from 'rxjs/operators'
import { Location } from '@angular/common'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
})
export class LoginComponent implements OnInit, OnDestroy {
  private destroyed$ = new Subject<boolean>()
  auth$: Observable<AuthState>

  returnUrl: string

  constructor(
    private store: Store<AppState>,
    private activatedRoute: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private _location: Location,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.returnUrl = params['returnUrl'] ?? '/'
    })

    this.authenticationService.currentUser
      .pipe(
        takeUntil(this.destroyed$),
        map(user => {
          if (user) this._location.back()
        }),
      )
      .subscribe()
  }

  onSubmitLoginForm(event: { username: string; password: string }) {
    this.store.dispatch(authActions.GetTokenAction(event))
  }

  ngOnDestroy() {
    this.destroyed$.next(true)
    this.destroyed$.complete()
  }
}
