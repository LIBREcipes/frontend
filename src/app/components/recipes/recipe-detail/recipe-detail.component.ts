import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute, Params, ActivatedRouteSnapshot } from '@angular/router'
import { Store, select } from '@ngrx/store'
import { Observable, Subject } from 'rxjs'
import Recipe from 'src/app/models/recipe.model'
import AppState from 'src/app/store/states/app.state'
import {
  selectRecipe,
  selectCurrentRecipe,
} from 'src/app/store/selectors/recipe.selector'
import { takeUntil, map } from 'rxjs/operators'
import { GetRecipeAction } from 'src/app/store/actions/recipe.actions'

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

  constructor(route: ActivatedRoute, store: Store<AppState>) {
    route.params.subscribe(params => {
      this.destroyed$.next(true)
      store.dispatch(GetRecipeAction({ uuid: params['recipe_uuid'] }))
      store
        .pipe(select(selectCurrentRecipe, params['recipe_uuid']))
        .pipe(
          takeUntil(this.destroyed$),
          map(recipe => {
            this.recipe = recipe
            this.displayPortionSize = recipe?.portion_size
          }),
        )
        .subscribe()
    })
  }

  ngOnInit(): void {}

  changePortionSize(amount) {
    this.displayPortionSize = Math.max(1, this.displayPortionSize + amount)
  }

  ngOnDestroy() {
    this.destroyed$.next(true)
    this.destroyed$.complete()
  }
}
