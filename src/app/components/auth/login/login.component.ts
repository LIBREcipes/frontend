import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Store, ScannedActionsSubject } from '@ngrx/store'
import { Observable, Subject } from 'rxjs'
import { AuthenticationService } from 'src/app/services/authentication.service'
import AuthState from 'src/app/store/states/auth.state'
import * as authActions from '../../../store/actions/auth.actions'
import AppState from 'src/app/store/states/app.state'
import { tap, takeUntil, map } from 'rxjs/operators'
import { Location } from '@angular/common'
import { ofType } from '@ngrx/effects'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
})
export class LoginComponent implements OnInit, OnDestroy {
  private destroyed$ = new Subject<boolean>()
  auth$: Observable<AuthState>

  returnUrl: string

  error: string = null

  constructor(
    private store: Store<AppState>,
    private activatedRoute: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private _location: Location,
    private actionsSubject: ScannedActionsSubject,
  ) {}

  ngOnInit(): void {
    this.returnUrl =
      this.activatedRoute.snapshot.queryParams['returnUrl'] ?? '/'

    this.authenticationService.currentUser
      .pipe(
        takeUntil(this.destroyed$),
        map(user => {
          if (user) this._location.back()
        }),
      )
      .subscribe()

    this.actionsSubject
      .pipe(takeUntil(this.destroyed$), ofType(authActions.LoginErrorAction))
      .subscribe(error => (this.error = error.detail))
  }

  onSubmitLoginForm(event: { username: string; password: string }) {
    this.error = null
    this.store.dispatch(authActions.GetTokenAction(event))
  }

  ngOnDestroy() {
    this.destroyed$.next(true)
    this.destroyed$.complete()
  }
}
