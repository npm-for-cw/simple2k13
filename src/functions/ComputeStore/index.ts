interface Func<T = unknown> {
  (...params: any[]): T
}
class ComputeStore {
  store: Map<Func, Map<string, any>>
  constructor() {
    this.store = new Map()
  }
  get<T>(func: Func<T>, ...args: any[]){
    const params = JSON.stringify(args)

    if (!this.store.has(func)) {
      const result = func(...args)
      const paramsMap = new Map<string,T>()

      paramsMap.set(params, result)
      this.store.set(func, paramsMap)
      return result
    }

    const paramsMap = this.store.get(func)

    if (!paramsMap?.has(params)) {
      const result = func(...args)

      paramsMap?.set(params, result)
      return result
    }
    return paramsMap.get(params) as T
  }
}
export default ComputeStore
