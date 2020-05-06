export default class DjangoError {
  public detail: string

  constructor(error: Error) {
    if (!error) {
      this.detail = 'An undefined error has occured'
      return
    }

    this.detail =
      'error' in error && 'detail' in error['error']
        ? error['error']['detail']
        : error['statusText']
  }
}
