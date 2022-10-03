import { debounce } from '../..'

const wait = 1_000
let count = 0

const func = (wait) => new Promise((reject) => {
  setTimeout(() => {
    reject('')
  }, wait)
})

const myDebounce = debounce(() => {
  count += 1
}, wait)

describe('storeStore', () => {
  test('count toEqual 0', () => {
    myDebounce()
    myDebounce()
    myDebounce()
    myDebounce()
    myDebounce()
    myDebounce()
    expect(count).toEqual(0)
  })
  test('count toEqual 1', async () => {
    await func(wait)
    expect(count).toEqual(1)
  })

})