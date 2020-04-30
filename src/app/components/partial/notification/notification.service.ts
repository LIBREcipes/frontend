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

  showNotification(msg: string) {
    this.onShow.next(new Notification(NotificationService.COUNTER++, msg))
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
