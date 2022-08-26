import { dataType } from '../../'


const testMap = [
  [null, 'Null'],
  [undefined, 'undefined'],
  [0, 'number'],
  [NaN, 'number'],
  [Infinity, 'number'],
  [-Infinity, 'number'],
  ['0', 'string'],
  [Symbol, 'function'],
  [() => { }, 'function'],
  [true, 'boolean'],
  [[], 'Array'],
  [{}, 'Object'],
  [new Uint8Array, 'Uint8Array'],
  [new Date(), 'Date'],
  [new Error(), 'Error'],
  [new RangeError(), 'Error']
]

describe('result', () => {
  describe('result', () => {
    test('should return a string', async () => {
      for await (const [key, value] of testMap) {
        expect(dataType(key)).toBe(value)
      }
    })
  })
})