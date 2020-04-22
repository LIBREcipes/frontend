import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import IngredientCreateDto from 'src/app/models/DTO/ingredient-create.model'

@Component({
  selector: 'app-ingredient-form',
  templateUrl: './ingredient-form.component.html',
  styleUrls: ['./ingredient-form.component.sass'],
})
export class IngredientFormComponent implements OnInit {
  @Input() data

  @Output() formSubmit = new EventEmitter<IngredientCreateDto>()
  @Output() cancel = new EventEmitter<any>()

  form: FormGroup

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      name: [this.data.query, Validators.required],
    })
  }

  onSubmit() {
    this.formSubmit.emit(IngredientCreateDto.fromFormValue(this.form.value))
  }
}
