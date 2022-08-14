import { PromiseQueue } from '../../index'

function promiseFunc(props: any) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('')
      // console.count('count')
      // console.log(props, 'props')
    }, Math.random() * 1000 + 1000)
  })
}

describe('promiseQueue', () => {
  const arr = Array(5).fill('').map((v, i) => i)
  const queue = new PromiseQueue()
  test('promiseQueue test1', async () => {
    expect.assertions(1);
    try {
      const result = await queue.init({ arr, func: promiseFunc })
      expect(result).toBe('finish')
      setTimeout(async () => {
        const result = await queue.cancel()
        expect(result).toBe('cancel')
        const result2 = await queue.init({ arr, func: promiseFunc })
        expect(result2).toBe('finish')
      }, 1000 * 0)
    } catch (error) {
      expect(error).toMatch('error')
    }
  })
  test('no arr', async () => {
    try {
      await queue.init({ arr: [], func: promiseFunc })
    } catch (error) {
      expect(error).toMatch('arr and func is required')
    }
  })
})