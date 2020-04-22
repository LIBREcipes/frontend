import { Injectable } from '@angular/core'
import { Subject, BehaviorSubject } from 'rxjs'
import { IngredientModalComponent } from './forms/ingredient-modal/ingredient-modal.component'
import Modal from './modal'
import Ingredient from 'src/app/models/ingredient.model'

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  public modals = new Subject<Modal>()
  public dataSubject = new BehaviorSubject<any>(null)

  constructor() {}

  showIngredientForm(query: string): Subject<Ingredient> {
    const data = {
      title: 'Create Ingredient',
      query: query,
    }
    this.modals.next(new Modal(IngredientModalComponent, data))

    this.dataSubject = new BehaviorSubject<Ingredient>(null)
    return this.dataSubject
  }
}
