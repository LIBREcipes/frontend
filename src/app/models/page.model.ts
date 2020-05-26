export default class Page<T> {
  private results: T[] = []
  public count: number

  constructor() {}

  private clone(): Page<T> {
    const model = new Page<T>()
    model.count = this.count
    model.results = this.results

    return model
  }

  public addPage(dto: PageDto<T>): Page<T> {
    const model = this.clone()
    model.count = dto.count
    model.results = [...model.results, ...dto.results]

    return model
  }

  public get objects(): T[] {
    return this.results
  }

  public addOrUpdate(obj: T, compareKey: string = 'uuid'): Page<T> {
    const model = this.clone()
    model.results = model.results.find(x => x[compareKey] === obj[compareKey])
      ? model.results.map(x => (x[compareKey] === obj[compareKey] ? obj : x))
      : [...model.results, obj]

    return model
  }

  public delete(toDelete: string, compareKey: string = 'uuid'): Page<T> {
    this.results = this.results.filter(x => x[compareKey] !== toDelete)
    return this
  }

  public hasContent(): boolean {
    return !!(this.results && this.results.length)
  }

  public getNextPageVars(limit: number): PageVars {
    return {
      limit,
      offset: this.results.length,
    }
  }
}

export interface PageDto<T> {
  count: number
  results: T[]
}

export interface PageVars {
  limit: number
  offset: number
}
