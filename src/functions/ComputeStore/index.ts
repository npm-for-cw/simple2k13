interface Func {
  (...params: unknown[]): unknown
}
class ComputeStore {
  store: Map<Func, Map<string, unknown>>
  constructor() {
    this.store = new Map()
  }
  get(func: Func, ...args: unknown[]) {
    const params = JSON.stringify(args)

    if (!this.store.has(func)) {
      const result = func(...args)
      const paramsMap = new Map()

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
    return paramsMap.get(params)
  }
}
export default ComputeStore
