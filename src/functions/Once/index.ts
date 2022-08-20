class Once {
  func: Function
  result: any
  constructor(func: Function) {
    this.func = func
    this.result
  }
  run(...args: any[]) {
    if (this.result !== undefined) return this.result
    this.result = this.func(...args)
    return this.result
  }
}
export default Once