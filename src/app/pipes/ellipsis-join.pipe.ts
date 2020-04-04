import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ellipsisJoin'
})
export class EllipsisJoinPipe implements PipeTransform {

  transform(value: any[], separator: string, length: number): string {
    let out = []
    let counter = 0
    for( let word of value) {
      counter += word.length + separator.length

      if ( counter > length ) {
        out.push('...')
        break;
      }

      out.push(word)
    }

    return out.join(separator)
  }

}
