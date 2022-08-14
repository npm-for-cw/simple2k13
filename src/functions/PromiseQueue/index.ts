
interface Prorps {
  arr: any[]
  func: Function
  limit?: number
}

class PromiseQueue {
  arr: Prorps['arr']
  func: Prorps['func']
  limit: number
  count: number
  isCancel?: boolean
  finishSResolve?: any
  constructor() {
    this.count = 0
    this.isCancel = false
    this.arr = []
    this.limit = 0
    this.func = () => { }
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
    if (!this.arr.length) return this.finishSResolve('finish')
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

