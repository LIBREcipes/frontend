import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Store } from '@ngrx/store'
import Recipe from 'src/app/models/recipe.model'
import AppState from 'src/app/store/states/app.state'

@Component({
  selector: 'app-recipe-add',
  templateUrl: './recipe-add.component.html',
  styleUrls: ['./recipe-add.component.sass'],
})
export class RecipeAddComponent implements OnInit {
  title = 'Add Recipe'

  constructor(private store: Store<AppState>, private router: Router) {}

  onRecipeCreated(recipe: Recipe): void {
    this.router.navigate(['/recipes', recipe.uuid])
  }

  ngOnInit(): void {}
}
