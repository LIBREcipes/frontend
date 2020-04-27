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

  private defaultData = {
    confirmButtonText: 'Save',
    startDisabled: false,
    hideCancel: false,
  }

  @ViewChild(ModalDirective, { static: true }) modalBody: ModalDirective
  private currentComponentRef: ComponentRef<Modalable>
  disabled: boolean = false

  constructor(private componentFactory: ComponentFactoryResolver) {
    super()
  }

  ngOnInit(): void {
    this.modal.data = { ...this.defaultData, ...this.modal.data }
    this.disabled = this.modal.data.startDisabled

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
    this.currentComponentRef.instance.disabled
      .pipe(takeUntil(this.destroy$))
      .subscribe(disabled => (this.disabled = disabled))
  }

  onSave(): void {
    this.currentComponentRef.instance.onModalSave()
  }

  onModalClose(obj: any = 'cancel'): void {
    this.modalClose.emit(obj)
  }
}
