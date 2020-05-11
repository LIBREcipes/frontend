import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core'
import {
  ControlValueAccessor,
  FormControl,
  FormGroup,
  ControlContainer,
} from '@angular/forms'

@Component({
  selector: 'app-recipe-step-field',
  templateUrl: './recipe-step-field.component.html',
  styleUrls: ['./recipe-step-field.component.sass'],
})
export class RecipeStepFieldComponent implements OnInit {
  @Input() step: number = 0
  @Output() remove = new EventEmitter()

  constructor(public controlContainer: ControlContainer) {}
  ngOnInit(): void {}

  get stepValue() {
    return this.controlContainer.control.get('description').value
  }

  get collapsed() {
    return this.controlContainer.control.get('collapsed')
  }

  toggleCollapsed() {
    this.collapsed.setValue(!this.collapsed.value)
  }
}
