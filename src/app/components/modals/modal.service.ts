import { Injectable } from '@angular/core'
import { Subject } from 'rxjs'
import { IngredientFormComponent } from 'src/app/forms/ingredient-form/ingredient-form.component'
import { RecipeCreateFormComponent } from 'src/app/forms/recipe-create-form/recipe-create-form.component'
import Ingredient from 'src/app/models/ingredient.model'
import Recipe from 'src/app/models/recipe.model'
import Modal from './modal'

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  public modals = new Subject<Modal>()
  public dataSubject = new Subject<any>()

  constructor() {}

  showIngredientForm(query: string): Subject<Ingredient> {
    const data = {
      title: 'Create Ingredient',
      query: query,
    }
    this.modals.next(new Modal(IngredientFormComponent, data))

    this.dataSubject.complete()
    this.dataSubject = new Subject<Ingredient>()
    return this.dataSubject
  }

  showEditRecipeForm(recipe: Recipe): Subject<Recipe> {
    const data = {
      title: 'Edit Recipe',
      recipe,
    }

    this.dataSubject.complete()
    this.modals.next(new Modal(RecipeCreateFormComponent, data))

    this.dataSubject = new Subject<Recipe>()
    return this.dataSubject
  }
}
