import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'highlight',
})
export class HighlightPipe implements PipeTransform {
  transform(value: string, query: string, ellipsis: number = -1): unknown {
    // Not sure if I want to go this way, normally the most important part
    // of a recipe is the front of the title
    /*
    const firstIndex = value.toLowerCase().indexOf(query.toLowerCase())
    let newVal: string
    let suffix = ''
    let prefix = ''
    let start = 0

    if (firstIndex < 0) return value

    if (query.length >= ellipsis) {
      start = firstIndex
    } else if (ellipsis >= value.length) {
      start = 0
    } else if (firstIndex + ellipsis / 2 <= value.length) {
      if (firstIndex - ellipsis / 2 >= 0) {
        start = firstIndex - ellipsis / 2
      }

      prefix = start > 0 ? '..' : ''
      suffix = start + ellipsis < value.length ? '..' : ''
    } else {
      start = value.length - ellipsis
      prefix = '..'
    }

    return `${prefix}<b>${value.substr(start, ellipsis)}</b>${suffix}`
    */

    let val =
      ellipsis > 0 && ellipsis < value.length
        ? `${value.substr(0, ellipsis)}..`
        : value

    const firstIndex = val.toLowerCase().indexOf(query.toLowerCase())

    if (firstIndex < 0) return val

    return val.replace(new RegExp(query, 'gi'), match => `<b>${match}</b>`)
  }
}
