import { Component, OnInit, OnDestroy } from '@angular/core'
import RecipeCreateDto from 'src/app/models/DTO/recipe-create.model'
import AppState from 'src/app/store/states/app.state'
import { Store, ActionsSubject } from '@ngrx/store'
import {
  CreateRecipeAction,
  CreateRecipeSuccessAction,
} from 'src/app/store/actions/recipe.actions'
import { Location } from '@angular/common'
import { Subject } from 'rxjs'
import { takeUntil } from 'rxjs/operators'
import { ofType } from '@ngrx/effects'
import { Router } from '@angular/router'

@Component({
  selector: 'app-recipe-add',
  templateUrl: './recipe-add.component.html',
  styleUrls: ['./recipe-add.component.sass'],
})
export class RecipeAddComponent implements OnInit, OnDestroy {
  private destroyed$ = new Subject<boolean>()
  title = 'Add Recipe'

  constructor(
    private store: Store<AppState>,
    actionsSubject: ActionsSubject,
    router: Router,
  ) {
    actionsSubject
      .pipe(takeUntil(this.destroyed$), ofType(CreateRecipeSuccessAction))
      .subscribe(recipe => router.navigate(['/recipes', recipe.uuid]))
  }

  ngOnInit(): void {}

  onRecipeSubmit(recipe: RecipeCreateDto): void {
    this.store.dispatch(CreateRecipeAction({ recipe }))
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true)
    this.destroyed$.complete()
  }
}
