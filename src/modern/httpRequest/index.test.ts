
import { httpRequest } from '../..'
jest.setTimeout(1_000 * 10)

const url = 'https://cdn.jsdelivr.net/gh/npm-for-cw/mockStaticFiles/simple2k13/dcm/isDICM.dcm'
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
  test('should return 404', async () => {
    try {
      await httpRequest(url + '_')
    } catch (error) {
      expect(error.status).toBe(404)
    }
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