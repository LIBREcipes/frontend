declare var window: any

const defaultVars = {
  defaultPageLimit: 15,
  title: 'LIBREcipes',
}

export default class DynamicEnvironment {
  public get config() {
    return { ...defaultVars, ...window.config }
  }
}
