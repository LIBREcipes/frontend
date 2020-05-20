import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormControl } from '@angular/forms'
import AppState from 'src/app/store/states/app.state'
import { Store, select } from '@ngrx/store'
import { selectRecipes } from 'src/app/store/selectors/recipe.selector'
import { ApiService } from 'src/app/services/api.service'
import { WithDestroy } from 'src/app/mixins'
import { takeUntil, debounceTime, debounce, filter } from 'rxjs/operators'
import { Subject } from 'rxjs'
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-autocomplete-search',
  templateUrl: './autocomplete-search.component.html',
  styleUrls: ['./autocomplete-search.component.sass'],
})
export class AutocompleteSearchComponent extends WithDestroy()
  implements OnInit {
  query = new FormControl('')

  activeRequestsRef = new Set()

  results = {
    recipes: null,
  }

  constructor(apiService: ApiService, route: ActivatedRoute) {
    super()
    const queryChanged = new Subject<void>()

    const chef_uuid = route.snapshot.paramMap.get('chef_uuid')
    const type =
      chef_uuid !== null ? RecipeSearchType.CHEF : RecipeSearchType.ALL

    this.query.valueChanges
      .pipe(
        takeUntil(this.destroy$),
        filter(v => v.length > 2),
        debounceTime(300),
      )
      .subscribe(value => {
        queryChanged.next()
        const service =
          type === RecipeSearchType.ALL
            ? apiService.searchRecipe(value)
            : apiService.searchRecipeForChef(chef_uuid, value)

        this.activeRequestsRef.add('recipes')
        service
          .pipe(takeUntil(queryChanged), takeUntil(this.destroy$))
          .subscribe(results => {
            this.activeRequestsRef.delete('recipes')
            this.results['recipes'] = results
          })
      })
  }

  ngOnInit(): void {}

  hasResults(): boolean {
    // expand with future more types of results like chefs, ingredients, ..
    return this.results.recipes && this.results.recipes.length
  }

  hasOutgoingRequests(): boolean {
    return !!this.activeRequestsRef.size
  }
}

enum RecipeSearchType {
  ALL,
  CHEF,
}
