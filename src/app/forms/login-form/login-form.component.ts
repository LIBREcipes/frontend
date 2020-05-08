import { Component, Injector, OnInit } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms'
import { ofType } from '@ngrx/effects'
import { ScannedActionsSubject, Store } from '@ngrx/store'
import { map, takeUntil } from 'rxjs/operators'
import { WithDestroy, WithModal } from 'src/app/mixins'
import {
  GetTokenAction,
  LoginErrorAction,
  LoginSuccessAction,
} from 'src/app/store/actions/auth.actions'
import AppState from 'src/app/store/states/app.state'
import { ModalService } from 'src/app/components/modals/modal.service'

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.sass'],
})
export class LoginFormComponent extends WithDestroy(WithModal(class {}))
  implements OnInit {
  errorType = LoginErrorAction
  loginForm = this.formBuilder.group({
    username: ['', [Validators.required, Validators.minLength(4)]],
    password: ['', [Validators.required, Validators.minLength(4)]],
  })

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    private modalService: ModalService,
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
      .subscribe(user => {
        window.location.reload()
        this.closeModal.emit(user)
      })

    // change confirm button's disabled state
    this.loginForm.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(_ => this.disabled.emit(!this.loginForm.valid))
  }

  ngOnInit(): void {}

  onSubmit() {
    this.isLoading.emit(true)
    this.store.dispatch(GetTokenAction(this.loginForm.value))
  }

  showForgotPassword() {
    this.modalService.showPasswordResetRequestForm()
  }

  onModalSave(): void {
    this.onSubmit()
  }
}
