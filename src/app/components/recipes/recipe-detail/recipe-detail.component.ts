import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute, Params } from '@angular/router'
import { ofType } from '@ngrx/effects'
import { ActionsSubject, select, Store } from '@ngrx/store'
import { Observable, Subject } from 'rxjs'
import { map, takeUntil, filter } from 'rxjs/operators'
import Recipe from 'src/app/models/recipe.model'
import { AuthenticationService } from 'src/app/services/authentication.service'
import {
  DeleteRecipeAction,
  DeleteRecipeSuccessAction,
  GetRecipeAction,
} from 'src/app/store/actions/recipe.actions'
import { selectCurrentRecipe } from 'src/app/store/selectors/recipe.selector'
import AppState from 'src/app/store/states/app.state'
import { Location } from '@angular/common'
import { ModalService } from '../../modals/modal.service'
import { WithDestroy } from 'src/app/mixins'

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.sass'],
})
export class RecipeDetailComponent extends WithDestroy() implements OnInit {
  private recipe$: Observable<Params>
  isShowEditing = false
  recipe: Recipe = null
  displayPortionSize: number = 0

  constructor(
    route: ActivatedRoute,
    private store: Store<AppState>,
    private authenticationService: AuthenticationService,
    actionsSubject: ActionsSubject,
    _location: Location,
    private modalService: ModalService,
  ) {
    super()
    route.params.subscribe(params => {
      this.destroy$.next()
      store
        .pipe(select(selectCurrentRecipe, params['recipe_uuid']))
        .pipe(
          takeUntil(this.destroy$),
          map(recipe => {
            if (!recipe) {
              store.dispatch(GetRecipeAction({ uuid: params['recipe_uuid'] }))
              return
            }
            this.recipe = recipe
            this.displayPortionSize = recipe?.portion_size
          }),
        )
        .subscribe()
    })

    actionsSubject
      .pipe(
        takeUntil(this.destroy$),
        ofType(DeleteRecipeSuccessAction),
        filter(a => a.recipe_uuid === this.recipe.uuid),
      )
      .subscribe(action => {
        _location.back()
      })
  }

  ngOnInit(): void {}

  isOwner(): boolean {
    return (
      this.authenticationService.currentUserValue &&
      this.recipe.chef.uuid === this.authenticationService.currentUserValue.uuid
    )
  }

  changePortionSize(amount) {
    this.displayPortionSize = Math.max(1, this.displayPortionSize + amount)
  }

  showEditModal() {
    this.modalService.showEditRecipeForm(this.recipe).subscribe(recipe =>
      // TODO show toast
      console.log('showEditRecipeForm subscription', recipe),
    )
  }

  deleteRecipe(): void {
    this.store.dispatch(DeleteRecipeAction({ recipe_uuid: this.recipe.uuid }))
  }
}
