import { Component, OnInit, Input } from '@angular/core'
import { Location } from '@angular/common'

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.sass'],
})
export class ErrorComponent implements OnInit {
  @Input() type: ERROR_TYPE

  constructor(private _location: Location) {}

  ngOnInit(): void {}

  getTitle(): string {
    switch (this.type) {
      case ERROR_TYPE.EMPTY:
        return 'No items found.'
      case ERROR_TYPE.NOT_FOUND:
      case ERROR_TYPE.ERROR:
      default:
        return 'Oops..'
    }
  }

  getMessage(): string {
    switch (this.type) {
      case ERROR_TYPE.EMPTY:
        return ''

      case ERROR_TYPE.NOT_FOUND:
        return 'This item does not exist or you do not have permission to view it.'

      case ERROR_TYPE.ERROR:
      default:
        return 'There was an error. If this problem persists, please contact the site administrator.'
    }
  }

  showBackButton(): boolean {
    switch (this.type) {
      case ERROR_TYPE.EMPTY:
        return false

      case ERROR_TYPE.NOT_FOUND:
      case ERROR_TYPE.ERROR:
      default:
        return true
    }
  }

  goBack(): void {
    this._location.back()
  }
}

export enum ERROR_TYPE {
  ERROR = 'error',
  NOT_FOUND = 'not-found',
  EMPTY = 'empty',
}
