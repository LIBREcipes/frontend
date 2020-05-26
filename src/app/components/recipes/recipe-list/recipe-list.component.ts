import { Component, OnInit, OnDestroy } from '@angular/core'
import { Store, select } from '@ngrx/store'
import RecipeState from 'src/app/store/states/recipe.state'
import Recipe from 'src/app/models/recipe.model'
import { Observable, Subscription, Subject } from 'rxjs'
import { map, filter, takeUntil } from 'rxjs/operators'
import * as recipeActions from '../../../store/actions/recipe.actions'
import AppState from 'src/app/store/states/app.state'
import { ActivatedRoute, Router } from '@angular/router'
import {
  selectRecipes,
  selectMyRecipes,
  selectRecipe,
} from 'src/app/store/selectors/recipe.selector'
import { WithDestroy } from 'src/app/mixins'
import Page, { PageVars } from 'src/app/models/page.model'
import { environment } from 'src/environments/environment'
import { AuthenticationService } from 'src/app/services/authentication.service'

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.sass'],
})
export class RecipeListComponent extends WithDestroy() implements OnInit {
  private chef_uuid: string = null
  title = 'Recipes'
  showEmptyStateError = false
  isLoadingPage = false

  recipePage: Page<Recipe> = new Page<Recipe>()

  constructor(
    private store: Store<AppState>,
    route: ActivatedRoute,
    private authService: AuthenticationService,
  ) {
    super()
    const routeChanged$ = new Subject<void>()
    route.paramMap.subscribe(params => {
      routeChanged$.next()

      this.chef_uuid = params.get('chef_uuid')
      this.subscribe(routeChanged$)
    })
  }

  private subscribe(subject: Subject<void>): void {
    let recipes$: Observable<any> = this.store.pipe(
      takeUntil(subject),
      takeUntil(this.destroy$),
    )

    if (this.chef_uuid) {
      if (this.chef_uuid === 'me')
        recipes$ = recipes$.pipe(select(selectMyRecipes))
    } else {
      recipes$ = recipes$.pipe(select(selectRecipes))
    }

    recipes$.subscribe(page => {
      this.recipePage = page
      this.isLoadingPage = false
    })
  }

  ngOnInit(): void {
    this.fetchRecipes()
  }

  onScrolledDown(): void {
    this.isLoadingPage = true
    this.fetchRecipes()
  }

  fetchRecipes() {
    if (!this.chef_uuid) {
      this.store.dispatch(
        recipeActions.GetRecipesAction({
          payload: this.recipePage.getNextPageVars(
            environment.config.defaultPageLimit,
          ),
        }),
      )
    } else {
      if (this.chef_uuid === 'me') {
        this.store.dispatch(
          recipeActions.GetForChefAction({
            chef_uuid: this.authService.currentUserValue.uuid,
            pageVars: this.recipePage.getNextPageVars(
              environment.config.defaultPageLimit,
            ),
          }),
        )
      }
    }
  }
}
