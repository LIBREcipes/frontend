import { Component, OnInit } from '@angular/core'
import { WithModal } from 'src/app/mixins'
import { ApiService } from 'src/app/services/api.service'
import { NotificationService } from '../../partial/notification/notification.service'

@Component({
  selector: 'app-share-modal',
  templateUrl: './share-modal.component.html',
  styleUrls: ['./share-modal.component.sass'],
})
export class ShareModalComponent extends WithModal() implements OnInit {
  link: string = null
  token: string = null

  constructor(
    private apiService: ApiService,
    private notificationService: NotificationService,
  ) {
    super()
  }

  ngOnInit(): void {
    switch (this.data.type) {
      case ShareModalType.RECIPE:
      default:
        this.apiService.getRecipePublicShortlink(this.data.uuid).subscribe(
          data => {
            this.token = data['token']
            this.link = `${window.location.protocol}//${window.location.host}/r/${data['token']}`
          },
          error => {
            this.notificationService.showNotification(
              'Something went wrong while getting shareable link',
              false,
            )
            this.closeModal.emit()
          },
        )
    }
  }

  removeLink(): void {
    switch (this.data.type) {
      case ShareModalType.RECIPE:
      default:
        this.apiService.deleteRecipeShortlink(this.token).subscribe(
          success => {
            this.closeModal.emit()
            this.notificationService.showNotification('Link removed')
          },
          error =>
            this.notificationService.showNotification(
              'Could not remove shortlink',
              false,
            ),
        )
        break
    }
  }

  showCopiedNotification(): void {
    this.notificationService.showNotification('Link copied to clipboard')
  }
}

export enum ShareModalType {
  RECIPE,
}
