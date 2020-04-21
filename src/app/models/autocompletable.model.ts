import { Store } from '@ngrx/store'
import AppState from '../store/states/app.state'
import { Observable } from 'rxjs'

export default interface Autocompletable {
  toAutocompleObject(): AutocompleteObject
}

export class AutocompleteObject {
  constructor(public id: string, public value: string) {}
}
