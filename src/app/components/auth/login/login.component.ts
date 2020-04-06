import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Store } from '@ngrx/store'
import { Observable, Subject } from 'rxjs'
import { AuthenticationService } from 'src/app/services/authentication.service'
import AuthState from 'src/app/store/states/auth.state'
import * as authActions from '../../../store/actions/auth.actions'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
})
export class LoginComponent implements OnInit, OnDestroy {
  auth$: Observable<AuthState>

  returnUrl: string

  constructor(
    private store: Store<{ auth: AuthState }>,
    private activatedRoute: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.returnUrl = params['returnUrl'] ?? '/'

      console.log('return url', this.returnUrl)
    })

    this.authenticationService.isAuthenticatedSubject.subscribe((x) => {
      if (x) {
        this.router.navigate([this.returnUrl])
      }
    })
  }

  onSubmitLoginForm(event: { username: string; password: string }) {
    this.store.dispatch(authActions.GetTokenAction(event))
  }

  ngOnDestroy() {
    this.authenticationService.isAuthenticatedSubject.unsubscribe()
  }
}
