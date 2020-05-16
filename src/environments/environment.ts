import DynamicEnvironment from './dynamic-environment'

class Environment extends DynamicEnvironment {
  public production: boolean
  public version = 'DEV'

  constructor() {
    super()
    this.production = false
  }
}

export const environment = new Environment()

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
