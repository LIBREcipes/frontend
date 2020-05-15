import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'

@Component({
  selector: 'app-bulma-dropdown',
  templateUrl: './bulma-dropdown.component.html',
  styleUrls: ['./bulma-dropdown.component.sass'],
})
export class BulmaDropdownComponent implements OnInit {
  @Input() value: string
  @Input() options: []

  @Output() dropdownSelect = new EventEmitter<string>()

  isActive = false

  constructor() {}

  ngOnInit(): void {}

  toggle(value = null) {
    this.isActive = value ?? !this.isActive
  }

  onDropdownSelected(item) {
    this.dropdownSelect.emit(item)
  }
}
