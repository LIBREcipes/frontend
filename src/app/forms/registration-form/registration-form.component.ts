import { Component, OnInit } from '@angular/core'
import { WithModal, WithDestroy } from 'src/app/mixins'
import { FormBuilder, Validators } from '@angular/forms'
import { takeUntil } from 'rxjs/operators'
import * as faker from 'faker'
import { MustMatch } from '../validators'
import {
  CreateUserAction,
  CreateUserSuccessAction,
} from 'src/app/store/actions/auth.actions'
import UserCreateDto from 'src/app/models/DTO/user-create.model'
import { Store, ScannedActionsSubject } from '@ngrx/store'
import AppState from 'src/app/store/states/app.state'
import { ofType } from '@ngrx/effects'
import { NotificationService } from 'src/app/components/partial/notification/notification.service'

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.sass'],
})
export class RegistrationFormComponent extends WithDestroy(WithModal(class {}))
  implements OnInit {
  form = this.fb.group(
    {
      username: ['', Validators.required],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      password_confirm: ['', Validators.required],
    },
    {
      validator: MustMatch('password', 'password_confirm'),
    },
  )

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private notificationService: NotificationService,
    actionsSubject: ScannedActionsSubject,
  ) {
    super()
    actionsSubject
      .pipe(takeUntil(this.destroy$), ofType(CreateUserSuccessAction))
      .subscribe(user => {
        this.notificationService.showNotification(`Registration Successful. 
      Please <b>activate</b> your account by clicking on the link in your <b>email</b>.`),
          this.closeModal.emit()
      })
  }

  ngOnInit(): void {
    this.form.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(changes => {
      if (changes.username === '1234') {
        this.seed()
      }
      this.disabled.emit(!this.form.valid)
    })
  }

  seed() {
    this.form.get('username').setValue(faker.internet.userName())
    this.form.get('first_name').setValue(faker.name.firstName())
    this.form.get('last_name').setValue(faker.name.lastName())
    this.form.get('email').setValue(faker.internet.email())

    const password = faker.internet.password()
    this.form.get('password').setValue(password)
    this.form.get('password_confirm').setValue(password)
  }

  onSubmit(): void {
    this.isLoading.emit(true)
    const user = UserCreateDto.fromFromValue(this.form.value)
    this.store.dispatch(CreateUserAction({ user }))
  }

  onModalSave(): void {
    this.onSubmit()
  }
}
