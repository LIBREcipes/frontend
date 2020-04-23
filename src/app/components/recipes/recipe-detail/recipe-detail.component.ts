import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute, Params } from '@angular/router'
import { ofType } from '@ngrx/effects'
import { ActionsSubject, select, Store } from '@ngrx/store'
import { Observable, Subject } from 'rxjs'
import { map, takeUntil } from 'rxjs/operators'
import Recipe from 'src/app/models/recipe.model'
import { AuthenticationService } from 'src/app/services/authentication.service'
import {
  DeleteRecipeAction,
  DeleteRecipeSuccessAction,
  GetRecipeAction,
} from 'src/app/store/actions/recipe.actions'
import { selectCurrentRecipe } from 'src/app/store/selectors/recipe.selector'
import AppState from 'src/app/store/states/app.state'
import { Location } from '@angular/common'

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.sass'],
})
export class RecipeDetailComponent implements OnInit, OnDestroy {
  private destroyed$ = new Subject<boolean>()
  private recipe$: Observable<Params>
  recipe: Recipe = null
  displayPortionSize: number = 0

  constructor(
    route: ActivatedRoute,
    private store: Store<AppState>,
    private authenticationService: AuthenticationService,
    actionsSubject: ActionsSubject,
    _location: Location,
  ) {
    route.params.subscribe(params => {
      this.destroyed$.next(true)
      store
        .pipe(select(selectCurrentRecipe, params['recipe_uuid']))
        .pipe(
          takeUntil(this.destroyed$),
          map(recipe => {
            if (!recipe) {
              store.dispatch(GetRecipeAction({ uuid: params['recipe_uuid'] }))
              return
            }
            this.recipe = recipe
            this.displayPortionSize = recipe?.portion_size
          }),
        )
        .subscribe()
    })

    actionsSubject
      .pipe(takeUntil(this.destroyed$), ofType(DeleteRecipeSuccessAction))
      .subscribe(action => {
        if (action.recipe_uuid === this.recipe.uuid) {
          console.log('well this happened...')
          _location.back()
        }
      })
  }

  ngOnInit(): void {}

  isOwner(): boolean {
    return (
      this.authenticationService.currentUserValue &&
      this.recipe.chef.uuid === this.authenticationService.currentUserValue.uuid
    )
  }

  changePortionSize(amount) {
    this.displayPortionSize = Math.max(1, this.displayPortionSize + amount)
  }

  deleteRecipe(): void {
    this.store.dispatch(DeleteRecipeAction({ recipe_uuid: this.recipe.uuid }))
  }

  ngOnDestroy() {
    this.destroyed$.next(true)
    this.destroyed$.complete()
  }
}
