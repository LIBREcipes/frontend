import { Injectable } from '@angular/core'
import { Subject } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  static COUNTER = 1

  public onShow = new Subject<Notification>()
  public onDelete = new Subject<number>()

  constructor() {}

  showNotification(msg: string, success = true, autoDismiss = true) {
    const notification = new Notification(
      NotificationService.COUNTER++,
      msg,
      success,
    )
    this.onShow.next(notification)

    if (autoDismiss) {
      setTimeout(() => this.deleteNotification(notification.id), 3000)
    }
  }

  deleteNotification(id: number) {
    this.onDelete.next(id)
  }
}

export class Notification {
  constructor(
    public id: number,
    public message: string = '',
    public success: boolean = true,
  ) {}
}
