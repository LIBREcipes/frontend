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
import { WithDestroy } from 'src/app/mixins'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
})
export class LoginComponent extends WithDestroy() implements OnInit, OnDestroy {
  auth$: Observable<AuthState>

  constructor(
    private activatedRoute: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private router: Router,
    private actionsSubject: ScannedActionsSubject,
  ) {
    super()
  }

  ngOnInit(): void {
    const returnUrl =
      this.activatedRoute.snapshot.queryParams['returnUrl'] ?? '/'

    this.authenticationService.currentUser
      .pipe(
        takeUntil(this.destroy$),
        map(user => {
          if (user) this.router.navigateByUrl(returnUrl)
        }),
      )
      .subscribe()
  }
}
