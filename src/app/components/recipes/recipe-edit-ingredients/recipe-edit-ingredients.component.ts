import { Component, OnInit, OnDestroy } from '@angular/core'
import {
  Store,
  select,
  ActionsSubject,
  ScannedActionsSubject,
} from '@ngrx/store'
import AppState from 'src/app/store/states/app.state'
import { ActivatedRoute, Router } from '@angular/router'
import { Subject } from 'rxjs'
import { takeUntil, map } from 'rxjs/operators'
import { selectRecipe } from 'src/app/store/selectors/recipe.selector'
import Recipe from 'src/app/models/recipe.model'
import RecipeIngredientDto from 'src/app/models/DTO/recipe-ingredient.model'
import {
  GetRecipeAction,
  UpdateRecipeSuccessAction,
  UpdateRecipeIngredientsAction,
} from 'src/app/store/actions/recipe.actions'
import { ofType } from '@ngrx/effects'
import { Location } from '@angular/common'
import { unescapeIdentifier } from '@angular/compiler'
import { WithDestroy } from 'src/app/mixins'

@Component({
  selector: 'app-recipe-edit-ingredients',
  templateUrl: './recipe-edit-ingredients.component.html',
  styleUrls: ['./recipe-edit-ingredients.component.sass'],
})
export class RecipeEditIngredientsComponent extends WithDestroy()
  implements OnInit {
  recipe: Recipe

  constructor(
    private store: Store<AppState>,
    route: ActivatedRoute,
    actionsSubject: ScannedActionsSubject,
    private router: Router,
  ) {
    super()
    const routeChanged$ = new Subject<boolean>()
    route.params.subscribe(params => {
      if (params['recipe_uuid']) {
        store
          .pipe(select(selectRecipe, { recipe_uuid: params['recipe_uuid'] }))
          .pipe(takeUntil(routeChanged$), takeUntil(this.destroy$))
          .subscribe(recipe => {
            if (!recipe) {
              store.dispatch(GetRecipeAction({ uuid: params['recipe_uuid'] }))
              return
            }
            this.recipe = recipe
          })
      }
    })

    // subscribe to update done
    actionsSubject
      .pipe(
        takeUntil(this.destroy$),
        ofType(UpdateRecipeSuccessAction),
        map(props => props.recipe),
      )
      .subscribe(recipe => {
        this.goBack()
      })
  }

  ngOnInit(): void {}

  goBack() {
    this.router.navigate(['/recipes', this.recipe.uuid])
  }

  onSubmit(ingredients: RecipeIngredientDto): void {
    if (!ingredients) {
      this.goBack()
      return
    }

    this.store.dispatch(
      UpdateRecipeIngredientsAction({
        recipe_uuid: this.recipe.uuid,
        ingredients,
      }),
    )
  }
}
