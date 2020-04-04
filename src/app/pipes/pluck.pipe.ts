import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pluck'
})
export class PluckPipe implements PipeTransform {

  transform(value: any[], keystring: string): any {
    let out = value
    const keys = keystring.split('.')
    for( let key of keys ){
      out = out.map(v => v[key])
    }

    return out
  }

}
