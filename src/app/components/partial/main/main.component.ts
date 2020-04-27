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
import { WithDestroy } from 'src/app/mixins'

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
  ) {
    super()
  }

  ngOnInit(): void {
    this.modalService.modals.subscribe(modal => this.showModal(modal))
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
        this.modalService.dataSubject.next(obj)
      })
  }
}
