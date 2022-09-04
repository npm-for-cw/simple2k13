import { objectToQuery } from '../..'

let data = {
  a: 1,
  b: 2,
  c: 3,
  d: {
    e: 5,
    f: 6
  },
}
describe('objectToQuery', () => {
  test('data', () => {
    expect(objectToQuery(data)).toBe('?a=1&b=2&c=3&d[e]=5&d[f]=6')
  })
  test('data.d', () => {
    expect(objectToQuery(data.d, "d")).toBe('d[e]=5&d[f]=6')
  })
})