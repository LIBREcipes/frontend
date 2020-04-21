import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core'

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.sass'],
})
export class ConfirmModalComponent implements OnInit {
  @Input() active = false
  @Output() toggle = new EventEmitter()
  @Output() confirmed = new EventEmitter()

  constructor() {}

  ngOnInit(): void {}
}
