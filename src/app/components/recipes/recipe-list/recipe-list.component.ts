import { Component, OnInit, OnDestroy } from '@angular/core'
import { Store, select } from '@ngrx/store'
import RecipeState from 'src/app/store/states/recipe.state'
import Recipe from 'src/app/models/recipe.model'
import { Observable, Subscription, Subject } from 'rxjs'
import { map, filter, takeUntil } from 'rxjs/operators'
import * as recipeActions from '../../../store/actions/recipe.actions'
import AppState from 'src/app/store/states/app.state'
import { ActivatedRoute, Router } from '@angular/router'
import {
  selectRecipes,
  selectChefRecipes,
} from 'src/app/store/selectors/recipe.selector'

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.sass'],
})
export class RecipeListComponent implements OnInit, OnDestroy {
  private destroyed$ = new Subject<boolean>()
  private chef_uuid: string
  title = 'Recipes'
  showEmptyState: boolean = false

  recipes$: Observable<Recipe[]>
  recipeSubscription: Subscription
  recipes: Recipe[] = []

  constructor(private store: Store<AppState>, route: ActivatedRoute) {
    route.params.subscribe(x => {
      this.chef_uuid = x['chef_uuid']
      this.title = x['chef_uuid'] ? 'My Recipes' : 'Recipes'

      if (this.chef_uuid) {
        store.dispatch(
          recipeActions.GetForChefAction({ chef_uuid: this.chef_uuid }),
        )
      }

      this.recipes$ = store.pipe(
        select(selectChefRecipes, { chef_uuid: this.chef_uuid }),
      )
    })
  }

  ngOnInit(): void {
    this.recipes$
      .pipe(
        takeUntil(this.destroyed$),
        map(recipes => {
          this.recipes = recipes
          this.showEmptyState = !recipes
        }),
      )
      .subscribe()

    this.store.dispatch(recipeActions.GetRecipesAction())
  }

  ngOnDestroy() {
    this.destroyed$.next(true)
    this.destroyed$.complete()
  }
}
