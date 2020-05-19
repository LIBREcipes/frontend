import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'
import RecipeStep from 'src/app/models/recipe-step.model'
import RecipeStepDto from 'src/app/models/DTO/recipe-step.model'
import { FormBuilder, FormArray, Validators } from '@angular/forms'
import { ErrorRecipeAction } from 'src/app/store/actions/recipe.actions'

@Component({
  selector: 'app-recipe-steps-form',
  templateUrl: './recipe-steps-form.component.html',
  styleUrls: ['./recipe-steps-form.component.sass'],
})
export class RecipeStepsFormComponent implements OnInit {
  @Input() initial: RecipeStep[]
  @Output() formSubmit = new EventEmitter<RecipeStepDto>()
  errorType = ErrorRecipeAction
  isLoading = false

  allCollapsed = true

  form = this.fb.group({
    steps: this.fb.array([]),
  })

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    for (let step of this.initial) {
      this.steps.push(this.getForm(step.id, step.description))
    }

    if (this.initial.length === 0) {
      this.addForm()
    }
  }

  get steps(): FormArray {
    return this.form.get('steps') as FormArray
  }

  getForm(id: number = null, description: string = null) {
    return this.fb.group({
      id: [id],
      description: [description, Validators.required],
      collapsed: [true],
    })
  }

  addForm() {
    const form = this.getForm()
    form.get('collapsed').setValue(false)
    this.expandCollapseAll(true)
    this.steps.push(form)
  }

  removeForm(index) {
    this.steps.removeAt(index)
    this.form.markAsDirty()
  }

  onSubmit() {
    this.isLoading = true

    this.formSubmit.emit(
      !this.form.dirty && !this.form.touched
        ? null
        : RecipeStepDto.fromFormValue(this.form.value),
    )
  }

  stepDropped(el) {
    const step = this.steps.at(el.previousIndex)
    this.steps.removeAt(el.previousIndex)
    this.steps.insert(el.currentIndex, step)
    this.form.markAsDirty()
  }

  expandCollapseAll(value: boolean = null): void {
    if (value === null) {
      this.allCollapsed = !this.allCollapsed
      value = this.allCollapsed
    }

    this.steps.controls.forEach(f => f.get('collapsed').setValue(value))
  }
}
