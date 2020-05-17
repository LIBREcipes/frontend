import DynamicEnvironment from './dynamic-environment'

class Environment extends DynamicEnvironment {
  public production: boolean
  public version = '0.1'

  constructor() {
    super()
    this.production = true
  }
}
export const environment = new Environment()
