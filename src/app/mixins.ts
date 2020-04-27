import { OnDestroy, Input, Output, EventEmitter } from '@angular/core'
import { Subject } from 'rxjs'
import { Modalable } from './components/modals/modal'

export type Constructor<T> = new (...args: any[]) => T

export function WithDestroy<T extends Constructor<{}>>(
  Base: T = class {} as any,
) {
  return class extends Base implements OnDestroy {
    destroy$ = new Subject<void>()

    ngOnDestroy() {
      this.destroy$.next()
      this.destroy$.complete()
    }
  }
}

export function WithModal<T extends Constructor<{}>>(
  Base: T = class {} as any,
) {
  class WithModalClass extends Base implements Modalable {
    @Input() data
    @Output() closeModal = new EventEmitter()
    isModal: boolean = false

    onModalSave(): void {
      throw new Error('onModalSave needs to be overriden')
    }

    initModal(): void {
      this.isModal = true
    }
  }

  return WithModalClass
}
