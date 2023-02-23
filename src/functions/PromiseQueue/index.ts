
type Func = (...params: unknown[]) => unknown;
interface Prorps {
  arr: unknown[]
  func: Func
  limit?: number
}

class PromiseQueue {
  arr: Prorps['arr']
  func: Prorps['func']
  limit: number
  count: number
  isCancel?: boolean
  finishSResolve: (value: unknown) => void
  constructor() {
    this.count = 0
    this.isCancel = false
    this.arr = []
    this.limit = 0
    this.func = () => ({})
    this.finishSResolve = () => ({})
  }
  init(props: Prorps) {
    const { arr = [], func, limit = 6 } = props || {}
    if (!arr.length || !func) return Promise.reject('arr and func is required')
    this.count = 0
    this.isCancel = false
    this.arr = [...arr]
    this.limit = Math.min(limit, arr.length)
    this.func = func
    this.loop()
    return new Promise((resolve) => {
      this.finishSResolve = resolve
    })
  }
  async loop() {
    if (this.isCancel) return
    if (!this.arr.length) {
      (this.count === 0) ? this.finishSResolve('finish') : setTimeout(() => this.loop(), 100);
      return
    }
    this.count += 1
    if (this.count < this.limit) {
      this.loop()
    }
    await this.func(this.arr.shift())
    if (this.count >= this.limit) {
      this.loop()
    }
    this.count -= 1
  }
  cancel() {
    this.isCancel = true
    return Promise.resolve('cancel')
  }

}

export default PromiseQueue

