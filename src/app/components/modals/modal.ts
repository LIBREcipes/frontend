import { Type } from '@angular/core'

export default class Modal {
  constructor(public component: Type<Modalable>, public data: any) {}
}

export interface Modalable {
  data: any
  closeModal: any //eventemitter
  isModal: boolean
  onModalSave(): void
  initModal(): void
}
