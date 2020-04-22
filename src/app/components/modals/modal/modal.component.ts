import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
  ViewContainerRef,
} from '@angular/core'

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.sass'],
})
export class ModalComponent implements OnInit {
  @Input() data: any

  @Output() cancel = new EventEmitter<any>()

  @ViewChild('modalBody', { read: ViewContainerRef }) modalBody
  constructor() {}

  ngOnInit(): void {}

  onCancel(): void {
    this.cancel.emit('cancel')
  }
}
