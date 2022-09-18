import { isDICM, httpRequest } from '../..'
jest.setTimeout(1_000 * 10)

const url = 'https://cdn.jsdelivr.net/gh/npm-for-cw/mockStaticFiles/simple2k13/dcm/isDICM.dcm'
const url2 = 'https://cdn.jsdelivr.net/gh/npm-for-cw/mockStaticFiles/simple2k13/png/isDICM.png'
describe('isDICM', () => {
  test('isDICM', async () => {
    try {
      const { response }: any = await httpRequest(url, {
        responseType: 'arraybuffer'
      })
      expect(isDICM(response)).toBe(true)
    } catch (error) {
      console.log(error)
    }
  })
  test('no isDICM', async () => {
    try {
      const { response }: any = await httpRequest(url2, {
        responseType: 'arraybuffer'
      })
      expect(isDICM(response)).toBe(false)
    } catch (error) {
      console.log(error)
    }
  })
})