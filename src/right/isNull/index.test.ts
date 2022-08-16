
import { isNull } from '../..'

const isNullMap = ['', "", ' ', " ", ``, ` `, null, undefined, [], {}]
const NoNullMap = [0, 'a', '1', '0', 'true', 'false', true, false, '{}', '[]', 'undefined', 'null']

describe('test isNull', () => {
  it('isNull', () => {
    isNullMap.forEach(item => {
      expect(isNull(item)).toBe(true)
    })
  })
  it('NoNullMap', () => {
    NoNullMap.forEach(item => {
      expect(isNull(item)).toBe(false)
    })
  })
})