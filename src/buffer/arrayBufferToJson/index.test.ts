
import { arrayBufferToJson } from '../..'
import { TextDecoder } from 'text-encoding';
window.TextDecoder = TextDecoder;

const fetch = (): Promise<ArrayBuffer> => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open('get', 'https://www.fastmock.site/mock/166a3ae9bb7527f60537d59dc3bc5a17/simple/api/getArrayBufferToJsonTestData', true)
    xhr.responseType = 'arraybuffer'
    xhr.onreadystatechange = function () {
      const { status, readyState, response } = xhr
      if (status !== 200) return reject(response)
      if (readyState === 4) {
        resolve(response)
      }
    }
    xhr.send()
  })
}

describe('arrayBufferToJson', () => {
  test('getArraybuffer', async () => {
    const res = await fetch()
    expect(arrayBufferToJson(res, true)).toEqual(expect.objectContaining({
      msg: 'success',
      code: 0,
      result: 'arrayBufferToJson'
    }))
  })
})