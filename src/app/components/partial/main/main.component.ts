import {
  Component,
  OnInit,
  ViewChild,
  ComponentFactoryResolver,
  ComponentFactory,
  ViewContainerRef,
} from '@angular/core'
import { environment } from 'src/environments/environment'
import Modal from '../../modals/modal'
import { ModalComponent } from '../../modals/modal/modal.component'
import { ModalDirective } from '../../modals/modal.directive'
import { ModalService } from '../../modals/modal.service'
import { takeUntil } from 'rxjs/operators'
import { WithDestroy } from 'src/app/mixins'
import { NotificationComponent } from '../notification/notification.component'
import {
  NotificationService,
  Notification,
} from '../notification/notification.service'
import { Title } from '@angular/platform-browser'

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.sass'],
})
export class MainComponent extends WithDestroy() implements OnInit {
  title = 'librecipes'

  constructor(
    private componentFactory: ComponentFactoryResolver,
    private modalService: ModalService,
    private notificationService: NotificationService,
    titleService: Title,
  ) {
    super()
    titleService.setTitle(environment.config.title)
  }

  ngOnInit(): void {
    this.modalService.modals
      .pipe(takeUntil(this.destroy$))
      .subscribe(modal => this.showModal(modal))

    this.notificationService.onShow
      .pipe(takeUntil(this.destroy$))
      .subscribe(notification => this.showNotification(notification))
    this.notificationService.onDelete
      .pipe(takeUntil(this.destroy$))
      .subscribe(id => this.deleteNotification(id))
  }

  // MODALS
  @ViewChild(ModalDirective, { static: true }) modalHost: ModalDirective

  showModal(modal: Modal): void {
    const factory = this.componentFactory.resolveComponentFactory(
      ModalComponent,
    )

    const viewContainerRef = this.modalHost.viewContainerRef
    viewContainerRef.clear()

    const componentRef = viewContainerRef.createComponent(factory)
    componentRef.instance.modal = modal
    componentRef.instance.modalClose
      .pipe(takeUntil(this.destroy$))
      .subscribe(obj => {
        viewContainerRef.clear()
        if (obj !== 'cancel') this.modalService.dataSubject.next(obj)
      })
  }

  // NOTIFICATIONS
  @ViewChild('notifications', { read: ViewContainerRef })
  notificationsContainer: ViewContainerRef
  private notifications = []

  showNotification(notification: Notification) {
    const factory = this.componentFactory.resolveComponentFactory(
      NotificationComponent,
    )

    const component = this.notificationsContainer.createComponent(factory)
    component.instance.notification = notification

    this.notifications.push(component)
  }

  deleteNotification(id: number) {
    const component = this.notifications.find(
      c => c.instance.notification.id === id,
    )
    const index = this.notifications.indexOf(component)

    if (index !== -1) {
      this.notificationsContainer.remove(index)
      this.notifications.splice(index, 1)
    }
  }
}
