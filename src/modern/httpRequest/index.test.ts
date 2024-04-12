import { httpRequest } from '../..';

jest.setTimeout(1_000 * 15);
// @ts-ignore
const url = 'https://www.fastmock.site/mock/166a3ae9bb7527f60537d59dc3bc5a17/simple/api/getArrayBufferToJsonTestData'
const data = new FormData()
data.append('test', '1')

describe('httpRequest', () => {
  test('should return 200', async () => {
    try {
      const res = await httpRequest(url)
      expect(res.status).toBe(200)
    } catch (error) {
      expect(error.readyState).toBe(4)
    }
  })
  test('should return 405', async () => {
    try {
      await httpRequest(url, {
        method: 'post',
        send: data
      })
    } catch (error) {
      expect(error.status).toBe(0)
    }
  })
  test('should return ?', async () => {
    try {
      await httpRequest(url, {}, (xhr) => {
        expect(xhr.status).toBe(0)
      })
    } catch (error) {
      expect(error.status).toBe(0)
    }
  })
})