import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { Action } from '@ngrx/store'
import { Observable, of } from 'rxjs'
import { catchError, map, mergeMap } from 'rxjs/operators'
import RecipeCreateDto from 'src/app/models/DTO/recipe-create.model'
import RecipeEditDto from 'src/app/models/DTO/recipe-edit.model'
import Ingredient from 'src/app/models/ingredient.model'
import { PageDto } from 'src/app/models/page.model'
import Recipe from 'src/app/models/recipe.model'
import { ApiService } from 'src/app/services/api.service'
import * as recipeActions from '../actions/recipe.actions'

@Injectable()
export class RecipeEffects {
  constructor(private apiService: ApiService, private action$: Actions) {}

  GetRecipes$: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType(recipeActions.GetRecipesAction),
      mergeMap(action =>
        this.apiService.getRecipes(action.payload).pipe(
          map((data: PageDto<Recipe>) => {
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
        this.apiService
          .getRecipesForChef(action.chef_uuid, action.pageVars)
          .pipe(
            map((data: PageDto<Recipe>) =>
              recipeActions.GetForChefSuccessAction({ payload: data }),
            ),
            catchError((error: Error) =>
              of(recipeActions.ErrorRecipeAction(error)),
            ),
          ),
      ),
    ),
  )

  CreateRecipeWithFile$: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType(recipeActions.CreateRecipeWithFileAction),
      mergeMap(action =>
        this.apiService.uploadFile(action.recipe.image).pipe(
          map(data => {
            let recipe: RecipeCreateDto = {
              ...action.recipe,
              image_id: data['id'],
            }
            delete recipe.image
            return recipeActions.CreateRecipeAction({ recipe })
          }),
          catchError((error: Error) =>
            of(recipeActions.ErrorRecipeAction(error)),
          ),
        ),
      ),
    ),
  )

  CreateRecipe$: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType(recipeActions.CreateRecipeAction),
      mergeMap(action =>
        this.apiService.createRecipe(action.recipe).pipe(
          map((recipe: Recipe) =>
            recipeActions.CreateRecipeSuccessAction({ recipe }),
          ),
          catchError((error: Error) =>
            of(recipeActions.ErrorRecipeAction(error)),
          ),
        ),
      ),
    ),
  )

  UpdateRecipeWithFile$: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType(recipeActions.UpdateRecipeWithFileAction),
      mergeMap(action =>
        this.apiService.uploadFile(action.recipe.image).pipe(
          map(data => {
            let recipe: RecipeEditDto = {
              ...action.recipe,
              image_id: data['id'],
            }
            delete recipe.image
            return recipeActions.UpdateRecipeAction({ recipe })
          }),
          catchError((error: Error) =>
            of(recipeActions.ErrorRecipeAction(error)),
          ),
        ),
      ),
    ),
  )

  UpdateRecipe$: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType(recipeActions.UpdateRecipeAction),
      mergeMap(action =>
        this.apiService.updateRecipe(action.recipe).pipe(
          map((recipe: Recipe) =>
            recipeActions.UpdateRecipeSuccessAction({ recipe }),
          ),
          catchError((error: Error) =>
            of(recipeActions.ErrorRecipeAction(error)),
          ),
        ),
      ),
    ),
  )

  DeleteRecipe$: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType(recipeActions.DeleteRecipeAction),
      mergeMap(action =>
        this.apiService.deleteRecipe(action.recipe_uuid).pipe(
          map(
            () => recipeActions.DeleteRecipeSuccessAction(action),
            catchError((error: Error) =>
              of(recipeActions.ErrorRecipeAction(error)),
            ),
          ),
        ),
      ),
    ),
  )

  SearchRecipe$: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType(recipeActions.SearchIngredientAction),
      mergeMap(action =>
        this.apiService.searchIngredient(action.query).pipe(
          map((ingredients: Ingredient[]) =>
            recipeActions.SearchIngredientSuccessAction({
              ingredients: ingredients,
            }),
          ),
          catchError((error: Error) =>
            of(recipeActions.ErrorRecipeAction(error)),
          ),
        ),
      ),
    ),
  )

  UpdateRecipeIngredients: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType(recipeActions.UpdateRecipeIngredientsAction),
      mergeMap(action =>
        this.apiService
          .updateRecipeIngredients(action.recipe_uuid, action.ingredients)
          .pipe(
            map((recipe: Recipe) =>
              recipeActions.UpdateRecipeSuccessAction({
                recipe: recipe,
              }),
            ),
            catchError((error: Error) =>
              of(recipeActions.ErrorRecipeAction(error)),
            ),
          ),
      ),
    ),
  )

  UpdateRecipeSteps: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType(recipeActions.UpdateRecipeStepsAction),
      mergeMap(action =>
        this.apiService
          .updateRecipeSteps(action.recipe_uuid, action.steps)
          .pipe(
            map((recipe: Recipe) =>
              recipeActions.UpdateRecipeSuccessAction({
                recipe: recipe,
              }),
            ),
            catchError((error: Error) =>
              of(recipeActions.ErrorRecipeAction(error)),
            ),
          ),
      ),
    ),
  )

  // INGREDIENTS

  GetIngredient$: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType(recipeActions.GetIngredientAction),
      mergeMap(action =>
        this.apiService.getIngredient(action.ingredient_uuid).pipe(
          map((ingredient: Ingredient) =>
            recipeActions.GetIngredientSuccessAction({
              ingredient: ingredient,
            }),
          ),
          catchError((error: Error) =>
            of(recipeActions.ErrorRecipeAction(error)),
          ),
        ),
      ),
    ),
  )

  CreateIngredient$: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType(recipeActions.CreateIngredientAction),
      mergeMap(action =>
        this.apiService.createIngredient(action.ingredient).pipe(
          map((ingredient: Ingredient) =>
            recipeActions.CreateIngredientSuccessAction({
              ingredient: ingredient,
            }),
          ),
          catchError((error: Error) =>
            of(recipeActions.ErrorRecipeAction(error)),
          ),
        ),
      ),
    ),
  )
}
