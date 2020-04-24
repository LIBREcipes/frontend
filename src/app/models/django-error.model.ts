export default class DjangoError {
  public detail: string

  constructor(error: Error) {
    this.detail = error['error']['detail']
  }
}
