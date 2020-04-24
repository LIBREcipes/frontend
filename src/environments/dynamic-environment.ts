declare var window: any

export default class DynamicEnvironment {
  public get config() {
    return window.config
  }
}
