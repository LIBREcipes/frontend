import {
  Component,
  OnInit,
  ViewChild,
  ComponentFactoryResolver,
  ComponentFactory,
} from '@angular/core'
import Modal from '../../modals/modal'
import { ModalComponent } from '../../modals/modal/modal.component'
import { ModalDirective } from '../../modals/modal.directive'
import { ModalService } from '../../modals/modal.service'
import { takeUntil } from 'rxjs/operators'

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.sass'],
})
export class MainComponent implements OnInit {
  title = 'librecipes'
  constructor(
    private componentFactory: ComponentFactoryResolver,
    private modalService: ModalService,
  ) {}

  ngOnInit(): void {
    this.modalService.modals.subscribe(modal => this.showModal(modal))
  }

  // MODALS
  @ViewChild(ModalDirective, { static: true }) modalHost: ModalDirective

  showModal(modal: Modal): void {
    const factory = this.componentFactory.resolveComponentFactory(
      modal.component,
    )

    const viewContainerRef = this.modalHost.viewContainerRef
    viewContainerRef.clear()

    const componentRef = viewContainerRef.createComponent(factory)
    componentRef.instance.data = modal.data
    componentRef.instance.cancel.subscribe(data => {
      viewContainerRef.clear()
      this.modalService.dataSubject.next(data)
    })
  }
}
