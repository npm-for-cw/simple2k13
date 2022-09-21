
import { httpRequest } from '../..'
jest.setTimeout(1_000 * 15)

const url = 'https://www.fastmock.site/mock/166a3ae9bb7527f60537d59dc3bc5a17/simple/api/getArrayBufferToJsonTestData'
const data = new FormData()
data.append('test', '1')

describe('httpRequest', () => {
  test('should return 200', async () => {
    const res = await httpRequest(url, {
      responseType: 'arraybuffer',
      method: 'get',
      send: data,
    })
    expect(res.status).toBe(200)
  })
  test('should return 405', async () => {
    try {
      await httpRequest(url, {
        method: 'post',
      })
    } catch (error) {
      expect(error.status).toBe(405)
    }
  })
  test('should return ?', async () => {
    await httpRequest(url, {}, (xhr) => {
      expect(xhr.status).toBe(0)
    })
  })
})