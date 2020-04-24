import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { Action } from '@ngrx/store'
import { Observable, of } from 'rxjs'
import { catchError, map, mergeMap } from 'rxjs/operators'
import User from 'src/app/models/user.model'
import { ApiService } from 'src/app/services/api.service'
import * as chefActions from '../actions/chef.actions'

@Injectable()
export class ChefEffects {
  constructor(private apiService: ApiService, private action$: Actions) {}

  GetChef$: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType(chefActions.GetChefAction),
      mergeMap(action =>
        this.apiService.getChef(action.uuid).pipe(
          map((data: User) => {
            return chefActions.GetChefSuccessAction({ chef: data })
          }),
          catchError((error: Error) => {
            return of(chefActions.ErrorAction(error))
          }),
        ),
      ),
    ),
  )
}
