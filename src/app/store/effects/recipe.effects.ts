import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { Observable, of } from 'rxjs'
import { mergeMap, map, catchError } from 'rxjs/operators'
import * as recipeActions from '../actions/recipe.actions'
import Recipe from 'src/app/models/recipe.model'
import { Action } from '@ngrx/store'
import { ApiService } from 'src/app/services/api.service'

@Injectable()
export class RecipeEffects {
  constructor(private apiService: ApiService, private action$: Actions) {}

  GetRecipes$: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType(recipeActions.GetRecipesAction),
      mergeMap(action =>
        this.apiService.getRecipes().pipe(
          map((data: Recipe[]) => {
            return recipeActions.SuccessGetRecipesAction({ payload: data })
          }),
          catchError((error: Error) => {
            return of(recipeActions.ErrorRecipeAction(error))
          }),
        ),
      ),
    ),
  )

  GetRecipe$: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType(recipeActions.GetRecipeAction),
      mergeMap(action =>
        this.apiService.getRecipe(action.uuid).pipe(
          map((data: Recipe) => {
            return recipeActions.SuccessGetRecipeAction(data)
          }),
          catchError((error: Error) => {
            return of(recipeActions.ErrorRecipeAction(error))
          }),
        ),
      ),
    ),
  )

  GetForChef$: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType(recipeActions.GetForChefAction),
      mergeMap(action =>
        this.apiService.getRecipesForChef(action.chef_uuid).pipe(
          map((data: Recipe[]) =>
            recipeActions.GetForChefSuccessAction({ recipes: data }),
          ),
          catchError((error: Error) =>
            of(recipeActions.ErrorRecipeAction(error)),
          ),
        ),
      ),
    ),
  )
}
