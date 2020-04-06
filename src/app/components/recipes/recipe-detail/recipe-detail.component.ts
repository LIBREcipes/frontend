import { Component, OnInit, OnDestroy } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import Recipe from 'src/app/models/recipe.model'
import { Store } from '@ngrx/store'
import RecipeState from 'src/app/store/states/recipe.state'
import { Observable, Subscription } from 'rxjs'
import { map, filter } from 'rxjs/operators'
import * as recipeActions from '../../../store/actions/recipe.actions'

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.sass'],
})
export class RecipeDetailComponent implements OnInit, OnDestroy {
  recipes$: Observable<RecipeState>
  recipesSubscription: Subscription
  recipe: Recipe = new Recipe()

  constructor(
    private store: Store<{ recipes: RecipeState }>,
    private activatedRoute: ActivatedRoute,
  ) {
    this.recipes$ = store.select('recipes')
  }

  ngOnInit(): void {
    let uuid = null
    this.activatedRoute.params.subscribe((params) => {
      uuid = params['recipe_uuid']
    })

    this.recipesSubscription = this.recipes$
      .pipe(
        map((x) => {
          console.log(x)
          this.recipe = x.recipes.find((recipe) => recipe.uuid === uuid)
        }),
      )
      .subscribe()
    this.store.dispatch(recipeActions.GetRecipeAction({ payload: uuid }))
  }

  ngOnDestroy() {
    if (this.recipesSubscription) {
      this.recipesSubscription.unsubscribe()
    }
  }
}
