import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core'
import { ofType } from '@ngrx/effects'
import { ScannedActionsSubject, Store } from '@ngrx/store'
import { Subject } from 'rxjs'
import { takeUntil } from 'rxjs/operators'
import IngredientCreateDto from 'src/app/models/DTO/ingredient-create.model'
import {
  CreateIngredientAction,
  CreateIngredientSuccessAction,
} from 'src/app/store/actions/recipe.actions'
import AppState from 'src/app/store/states/app.state'
import Ingredient from 'src/app/models/ingredient.model'

@Component({
  selector: 'app-ingredient-modal',
  templateUrl: './ingredient-modal.component.html',
  styleUrls: ['./ingredient-modal.component.sass'],
})
export class IngredientModalComponent implements OnInit, OnDestroy {
  private destroyed$ = new Subject<boolean>()
  @Input() data
  @Output() cancel = new EventEmitter<any>()

  constructor(
    private store: Store<AppState>,
    actionsSubject: ScannedActionsSubject,
  ) {
    actionsSubject
      .pipe(takeUntil(this.destroyed$), ofType(CreateIngredientSuccessAction))
      .subscribe(props => {
        this.onCancel(props.ingredient)
      })
  }

  ngOnInit(): void {}

  onCancel(ingredient: Ingredient = null): void {
    this.cancel.emit(ingredient)
  }

  onSubmit(ingredient: IngredientCreateDto): void {
    this.store.dispatch(CreateIngredientAction({ ingredient }))
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true)
    this.destroyed$.complete()
  }
}
