
import { arrayBufferToJson, httpRequest } from '../..'
import { TextDecoder } from 'text-encoding';
window.TextDecoder = TextDecoder;
describe('arrayBufferToJson', () => {

  test('TextDecoder getArraybuffer', async () => {
    const { response } = await httpRequest('https://www.fastmock.site/mock/166a3ae9bb7527f60537d59dc3bc5a17/simple/api/getArrayBufferToJsonTestData', {
      responseType: 'arraybuffer'
    })
    expect(arrayBufferToJson(response, true)).toMatchObject({
      msg: 'success',
      code: 0,
      result: 'arrayBufferToJson'
    })
  })
  test('fromCharCode getArraybuffer', async () => {
    // @ts-ignore
    window.TextDecoder = undefined
    const { response } = await httpRequest('https://www.fastmock.site/mock/166a3ae9bb7527f60537d59dc3bc5a17/simple/api/getArrayBufferToJsonTestData', {
      responseType: 'arraybuffer'
    })
    expect(arrayBufferToJson(response, true)).toMatchObject({
      msg: 'success',
      code: 0,
      result: 'arrayBufferToJson'
    })
  })
  test('error debug', () => {
    expect(arrayBufferToJson(new ArrayBuffer(10), true)).toBe(undefined)
  })
})