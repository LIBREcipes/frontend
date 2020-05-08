import { Component, OnInit } from '@angular/core'
import { WithDestroy, WithModal } from 'src/app/mixins'
import { FormBuilder, FormControl, Validators } from '@angular/forms'
import { takeUntil } from 'rxjs/operators'
import { ApiService } from 'src/app/services/api.service'
import { NotificationService } from 'src/app/components/partial/notification/notification.service'

@Component({
  selector: 'app-password-reset-request',
  templateUrl: './password-reset-request.component.html',
  styleUrls: ['./password-reset-request.component.sass'],
})
export class PasswordResetRequestComponent
  extends WithDestroy(WithModal(class {}))
  implements OnInit {
  form = this.fb.group({
    email: ['', [Validators.email, Validators.required]],
  })

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private notificationService: NotificationService,
  ) {
    super()
  }

  ngOnInit(): void {
    this.form.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(_ => this.disabled.emit(!this.form.valid))
  }

  onSubmit(): void {
    this.isLoading.emit(true)
    this.apiService
      .requestPasswordReset(this.form.value['email'])
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        data => {
          this.notificationService.showNotification(
            'Please check your <b>email</b>.',
            true,
            true,
          )
          this.isLoading.emit(false)
          this.closeModal.emit(true)
        },
        error => {
          this.isLoading.emit(false)
          this.notificationService.showNotification(
            'Something went wrong. Please try again later.',
            false,
            true,
          )
        },
      )
  }

  onModalSave(): void {
    this.onSubmit()
  }
}
