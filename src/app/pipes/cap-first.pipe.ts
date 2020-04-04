import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capFirst'
})
export class CapFirstPipe implements PipeTransform {

  transform(value: any): unknown {
      if (typeof value === 'string')
        return this.capitalizeFirstWord(value)

      if (Array.isArray(value) && typeof value[0] === 'string' )
        return value.map(v => this.capitalizeFirstWord(v))

      return value
  }

  capitalizeFirstWord(value: string) {
    return value[0].toUpperCase() + value.slice(1)
  }

}
