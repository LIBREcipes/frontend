import { Injectable, Type } from '@angular/core'
import { Subject } from 'rxjs'
import { IngredientFormComponent } from 'src/app/forms/ingredient-form/ingredient-form.component'
import { RecipeCreateFormComponent } from 'src/app/forms/recipe-create-form/recipe-create-form.component'
import Ingredient from 'src/app/models/ingredient.model'
import Recipe from 'src/app/models/recipe.model'
import Modal from './modal'
import { LoginFormComponent } from 'src/app/forms/login-form/login-form.component'
import User from 'src/app/models/user.model'

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  public modals = new Subject<Modal>()
  public dataSubject = new Subject<any>()

  constructor() {}

  private clearDataSubject<T>(): Subject<T> {
    this.dataSubject.complete()
    this.dataSubject = new Subject<T>()

    return this.dataSubject
  }

  showIngredientForm(query: string): Subject<Ingredient> {
    const data = {
      title: 'Create Ingredient',
      query: query,
    }
    this.modals.next(new Modal(IngredientFormComponent, data))

    return this.clearDataSubject<Ingredient>()
  }

  showEditRecipeForm(recipe: Recipe): Subject<Recipe> {
    const data = {
      title: 'Edit Recipe',
      recipe,
    }

    this.modals.next(new Modal(RecipeCreateFormComponent, data))

    return this.clearDataSubject<Recipe>()
  }

  showLoginForm(): Subject<User> {
    const data = {
      title: 'Login',
      confirmButtonText: 'Login',
      hideCancel: true,
      startDisabled: true,
    }

    this.modals.next(new Modal(LoginFormComponent, data))
    return this.clearDataSubject<User>()
  }
}
