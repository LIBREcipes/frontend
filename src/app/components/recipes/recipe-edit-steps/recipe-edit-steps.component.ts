import { Component, OnInit, OnDestroy } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import Recipe from 'src/app/models/recipe.model'
import { Subject } from 'rxjs'
import {
  Store,
  select,
  ActionsSubject,
  ScannedActionsSubject,
} from '@ngrx/store'
import AppState from 'src/app/store/states/app.state'
import { selectRecipe } from 'src/app/store/selectors/recipe.selector'
import { takeUntil, map } from 'rxjs/operators'
import RecipeStepDto from 'src/app/models/DTO/recipe-step.model'
import {
  GetRecipeAction,
  UpdateRecipeStepsAction,
  UpdateRecipeSuccessAction,
} from 'src/app/store/actions/recipe.actions'
import { ofType } from '@ngrx/effects'
import { WithDestroy } from 'src/app/mixins'

@Component({
  selector: 'app-recipe-edit-steps',
  templateUrl: './recipe-edit-steps.component.html',
  styleUrls: ['./recipe-edit-steps.component.sass'],
})
export class RecipeEditStepsComponent extends WithDestroy() implements OnInit {
  recipe: Recipe

  constructor(
    route: ActivatedRoute,
    private store: Store<AppState>,
    actionsSubject: ScannedActionsSubject,
    private router: Router,
  ) {
    super()
    const routeChanged$ = new Subject<boolean>()
    route.params.subscribe(params => {
      routeChanged$.next(true)
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

    // listen for update complete
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

  onSubmit(steps: RecipeStepDto) {
    if (!steps) {
      this.goBack()
      return
    }
    this.store.dispatch(
      UpdateRecipeStepsAction({ recipe_uuid: this.recipe.uuid, steps }),
    )
  }
}
