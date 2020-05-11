export default class DjangoError {
  public detail: string

  constructor(error: Error) {
    if (!error) {
      this.detail = 'An undefined error has occured'
      return
    }

    this.detail =
      error.hasOwnProperty('error') && error['error'].hasOwnProperty('detail')
        ? error['error']['detail']
        : error['statusText']
  }
}
