
type Func = (...params: unknown[]) => unknown;
interface Prorps {
  arr: unknown[]
  func: Func
  limit?: number
}

class PromiseQueue {
  taskId: number
  arr: Prorps['arr']
  func: Prorps['func']
  limit: number
  count: number
  finishSResolve: (value: unknown) => void
  constructor() {
    this.taskId = 0
    this.count = 0
    this.arr = []
    this.limit = 0
    this.func = () => ({})
    this.finishSResolve = () => ({})
  }
  init(props: Prorps) {
    const { arr = [], func, limit = 6 } = props || {}
    if (!arr.length || !func) return Promise.reject('arr and func is required')
    this.count = 0
    this.arr = [...arr]
    this.limit = Math.min(limit, arr.length)
    this.func = func
    this.loop(this.taskId)
    return new Promise((resolve) => {
      this.finishSResolve = resolve
    })
  }
  async loop(taskId: number) {
    if (taskId !== this.taskId) return
    if (!this.arr.length) {
      (this.count <= 0) ? this.finishSResolve('finish') : setTimeout(() => this.loop(this.taskId), 100);
      return
    }
    this.count += 1
    if (this.count < this.limit) {
      this.loop(this.taskId)
    }
    await this.func(this.arr.shift())
    if (taskId !== this.taskId) return
    if (this.count >= this.limit) {
      this.loop(this.taskId)
    }
    this.count -= 1
  }
  cancel() {
    this.taskId += 1
    return Promise.resolve('cancel')
  }

}

export default PromiseQueue

