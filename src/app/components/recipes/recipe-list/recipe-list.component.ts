import { Component, OnInit, OnDestroy } from '@angular/core'
import { Store, select } from '@ngrx/store'
import RecipeState from 'src/app/store/states/recipe.state'
import Recipe from 'src/app/models/recipe.model'
import { Observable, Subscription } from 'rxjs'
import { map } from 'rxjs/operators'
import * as recipeActions from '../../../store/actions/recipe.actions'
import AppState from 'src/app/store/states/app.state'

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.sass'],
})
export class RecipeListComponent implements OnInit, OnDestroy {
  title = 'Recipes'

  recipes$: Observable<RecipeState>
  recipeSubscription: Subscription
  recipes: Recipe[] = []

  constructor(private store: Store<AppState>) {
    this.recipes$ = store.pipe(select('recipes'))
  }

  ngOnInit(): void {
    this.recipeSubscription = this.recipes$
      .pipe(
        map(x => {
          this.recipes = x.recipes
        }),
      )
      .subscribe()

    this.store.dispatch(recipeActions.GetRecipesAction())
  }

  ngOnDestroy() {
    if (this.recipeSubscription) {
      this.recipeSubscription.unsubscribe()
    }
  }
}
