
type Func = (...params: unknown[]) => unknown;
class Once {
  func: Func
  result: unknown
  constructor(func: Func) {
    this.func = func
    this.result
  }
  run(...args: unknown[]) {
    if (this.result !== undefined) return this.result
    this.result = this.func(...args)
    return this.result
  }
}
export default Once