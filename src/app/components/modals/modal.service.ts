import { Injectable, Type } from '@angular/core'
import { Subject } from 'rxjs'
import { IngredientFormComponent } from 'src/app/forms/ingredient-form/ingredient-form.component'
import { RecipeCreateFormComponent } from 'src/app/forms/recipe-create-form/recipe-create-form.component'
import Ingredient from 'src/app/models/ingredient.model'
import Recipe from 'src/app/models/recipe.model'
import Modal, { Modalable } from './modal'
import { LoginFormComponent } from 'src/app/forms/login-form/login-form.component'
import User from 'src/app/models/user.model'
import { RegistrationFormComponent } from 'src/app/forms/registration-form/registration-form.component'
import { PasswordResetRequestComponent } from 'src/app/forms/auth/password-reset-request/password-reset-request.component'

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

  // use this to avoid circular dependencies?
  // TODO: let all components use this method in stead of predefined
  showModal<T>(component: Type<Modalable>, data: {} = {}): Subject<T> {
    this.modals.next(new Modal(component, data))
    return this.clearDataSubject<T>()
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

  showPasswordResetRequestForm(): Subject<void> {
    const data = {
      title: 'Reset Password',
      confirmButtonText: 'Send',
      startDisabled: true,
    }

    this.modals.next(new Modal(PasswordResetRequestComponent, data))
    return this.clearDataSubject<void>()
  }

  showRegistrationForm(): Subject<void> {
    const data = {
      title: 'Register',
      confirmButtonText: 'Register',
      startDisabled: true,
    }

    this.modals.next(new Modal(RegistrationFormComponent, data))
    return this.clearDataSubject<void>()
  }
}
