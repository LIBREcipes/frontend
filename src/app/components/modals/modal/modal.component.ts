import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
  ViewContainerRef,
  ComponentFactoryResolver,
  AfterViewInit,
  ComponentRef,
} from '@angular/core'
import Modal, { Modalable } from '../modal'
import { ModalDirective } from '../modal.directive'
import { NgModel } from '@angular/forms'
import { ModalService } from '../modal.service'
import { Subject } from 'rxjs'
import { takeUntil, tap } from 'rxjs/operators'
import { WithDestroy } from 'src/app/mixins'

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.sass'],
})
export class ModalComponent extends WithDestroy() implements OnInit {
  @Input() modal: Modal
  @Output() modalClose = new EventEmitter()

  @ViewChild(ModalDirective, { static: true }) modalBody: ModalDirective
  private currentComponentRef: ComponentRef<Modalable>

  constructor(private componentFactory: ComponentFactoryResolver) {
    super()
  }

  ngOnInit(): void {
    const factory = this.componentFactory.resolveComponentFactory(
      this.modal.component,
    )

    const viewContainerRef = this.modalBody.viewContainerRef
    viewContainerRef.clear()

    this.currentComponentRef = viewContainerRef.createComponent(factory)
    this.currentComponentRef.instance.data = this.modal.data
    this.currentComponentRef.instance.initModal()
    this.currentComponentRef.instance.closeModal
      .pipe(takeUntil(this.destroy$))
      .subscribe(recipe => this.onModalClose(recipe))
  }

  onSave(): void {
    this.currentComponentRef.instance.onModalSave()
  }

  onModalClose(obj: any = 'cancel'): void {
    this.modalClose.emit(obj)
  }
}
