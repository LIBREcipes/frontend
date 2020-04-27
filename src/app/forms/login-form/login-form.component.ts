import { Component, OnInit, EventEmitter, Output } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms'
import { WithModal, WithDestroy } from 'src/app/mixins'
import { Store, ScannedActionsSubject } from '@ngrx/store'
import AppState from 'src/app/store/states/app.state'
import {
  GetTokenAction,
  LoginSuccessAction,
  LoginErrorAction,
} from 'src/app/store/actions/auth.actions'
import { takeUntil, map } from 'rxjs/operators'
import { ofType } from '@ngrx/effects'

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.sass'],
})
export class LoginFormComponent extends WithDestroy(WithModal(class {}))
  implements OnInit {
  error: string = null
  loginForm = this.formBuilder.group({
    username: ['', [Validators.required, Validators.minLength(4)]],
    password: ['', [Validators.required, Validators.minLength(4)]],
  })

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    actionsSubject: ScannedActionsSubject,
  ) {
    super()

    // wait on login success
    actionsSubject
      .pipe(
        takeUntil(this.destroy$),
        ofType(LoginSuccessAction),
        map(props => props.user),
      )
      .subscribe(user => this.closeModal.emit(user))

    // Listen for login errors
    actionsSubject
      .pipe(takeUntil(this.destroy$), ofType(LoginErrorAction))
      .subscribe(error => (this.error = error.detail))

    // change confirm button's disabled state
    this.loginForm.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(_ => this.disabled.emit(!this.loginForm.valid))
  }

  ngOnInit(): void {}

  onSubmit() {
    this.error = null
    this.store.dispatch(GetTokenAction(this.loginForm.value))
  }

  onModalSave(): void {
    this.onSubmit()
  }
}
