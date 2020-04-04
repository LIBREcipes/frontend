import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { Observable, of } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators'
import * as recipeActions from '../actions/recipe.actions'
import Recipe from 'src/app/models/recipe.model';
import { Action } from '@ngrx/store';

@Injectable()
export class RecipeEffects {
    constructor(private http: HttpClient, private action$: Actions) {}

    private apiUrl: string = 'http://localhost:5000/api/recipes'

    GetRecipes$: Observable<Action> = createEffect(() => this.action$.pipe(
        ofType(recipeActions.GetRecipesAction),
        mergeMap( action => 
            this.http.get(`${this.apiUrl}`).pipe(
                map((data: Recipe[]) => {
                    console.log(data)
                    return recipeActions.SuccessGetRecipesAction({payload: data})
                }),
                catchError((error: Error) => {
                    console.log(error)
                    return of(recipeActions.ErrorRecipeAction(error))
                })
            )
        )
    ))
}