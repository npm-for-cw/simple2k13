import { ComputeStore } from '../../index'

const storeStore = new ComputeStore()
const func = (e: any) => e

describe('storeStore', () => {

  describe('args 1', () => {
    expect(storeStore.get(func, 1)).toBe(1)
    expect(storeStore.store.get(func)?.size).toBe(1)
  })

  describe('args 2', () => {
    expect(storeStore.get(func, 2, { a: 1 })).toBe(2)
    expect(storeStore.get(func, 2, { a: 1 })).toBe(2)

    describe('is cache', () => {
      expect(storeStore.store.get(func)?.size).toBe(2)
    })
  })

  describe('args 3', () => {
    expect(storeStore.get(func, 3, '{ a: 1 }')).toBe(3)
    expect(storeStore.get(func, 3, '{ a: 1 }')).toBe(3)

    expect(storeStore.get(func, 3, '{ a: 2 }')).toBe(3)

    expect(storeStore.get((e: any) => e, 3, '{ a: 2 }')).toBe(3)

    describe('is cache', () => {
      expect(storeStore.store?.size).toBe(2)
      expect(storeStore.store.get(func)?.size).toBe(4)
    })
  })
  test('args is no', () => {
    expect(storeStore.get(func)).toBe(undefined)
  })

})