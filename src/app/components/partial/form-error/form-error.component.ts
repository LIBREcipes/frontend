import { Component, OnInit, Input, Type } from '@angular/core'
import { WithDestroy } from 'src/app/mixins'
import { ScannedActionsSubject, Action, ActionCreator } from '@ngrx/store'
import { takeUntil, map } from 'rxjs/operators'
import { ErrorRecipeAction } from 'src/app/store/actions/recipe.actions'
import { ofType } from '@ngrx/effects'
import DjangoError from 'src/app/models/django-error.model'

@Component({
  selector: 'app-form-error',
  templateUrl: './form-error.component.html',
  styleUrls: ['./form-error.component.sass'],
})
export class FormErrorComponent extends WithDestroy() implements OnInit {
  @Input() action: any
  @Input() spacer = false
  error: string = null

  constructor(private actionsSubject: ScannedActionsSubject) {
    super()
  }

  ngOnInit(): void {
    this.actionsSubject
      .pipe(
        takeUntil(this.destroy$),
        ofType(this.action),
        map(err => (err['detail'] ? err : new DjangoError(<Error>err))),
      )
      .subscribe(err => (this.error = err.detail))
  }
}
