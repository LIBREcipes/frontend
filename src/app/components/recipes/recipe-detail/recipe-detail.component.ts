import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute, Params, Router } from '@angular/router'
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
  ErrorRecipeAction,
} from 'src/app/store/actions/recipe.actions'
import { selectCurrentRecipe } from 'src/app/store/selectors/recipe.selector'
import AppState from 'src/app/store/states/app.state'
import { Location } from '@angular/common'
import { ModalService } from '../../modals/modal.service'
import { WithDestroy } from 'src/app/mixins'
import { NotificationService } from '../../partial/notification/notification.service'

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
  recipeEditDropdown = false
  showEmptyStateError = false

  constructor(
    route: ActivatedRoute,
    private store: Store<AppState>,
    private authenticationService: AuthenticationService,
    actionsSubject: ActionsSubject,
    router: Router,
    private modalService: ModalService,
    private notificationService: NotificationService,
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
      .pipe(takeUntil(this.destroy$), ofType(ErrorRecipeAction))
      .subscribe(_ => (this.showEmptyStateError = true))

    actionsSubject
      .pipe(
        takeUntil(this.destroy$),
        ofType(DeleteRecipeSuccessAction),
        filter(a => a.recipe_uuid === this.recipe.uuid),
      )
      .subscribe(action => {
        router.navigate(['/recipes'])
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
    this.modalService.showEditRecipeForm(this.recipe).subscribe(recipe => {
      this.notificationService.showNotification(
        `Successfully update <b>${recipe.name}</b>.`,
      )
    })
  }

  deleteRecipe(): void {
    this.store.dispatch(DeleteRecipeAction({ recipe_uuid: this.recipe.uuid }))
  }

  showImage(url: string) {
    window.open(url, '_blank')
  }
}
