import { Component, OnInit, Input } from '@angular/core'
import { Notification, NotificationService } from './notification.service'

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.sass'],
})
export class NotificationComponent implements OnInit {
  @Input() notification: Notification

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {}

  remove() {
    this.notificationService.deleteNotification(this.notification.id)
  }
}
