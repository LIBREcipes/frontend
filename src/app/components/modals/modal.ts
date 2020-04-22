import { Type } from '@angular/core'

export default class Modal {
  constructor(public component: Type<any>, public data: any) {}
}
