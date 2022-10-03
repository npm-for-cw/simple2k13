import { queryToObject } from '../..'

describe("URLParams", () => {
  test('return {test:"1"}', () => {
    expect(queryToObject('?test=1')).toMatchObject({ test: '1' })
  })
  test('return {}', () => {
    expect(queryToObject()).toMatchObject({})
  })
})