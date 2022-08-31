import { isDICM } from '../..'

const url = 'https://cdn.jsdelivr.net/gh/npm-for-cw/mockStaticFiles/simple2k13/dcm/isDICM.dcm'
const url2 = 'https://cdn.jsdelivr.net/gh/npm-for-cw/mockStaticFiles/simple2k13/dcm/isDICM.png'
const fetch = (url) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true)
    xhr.responseType = 'arraybuffer'
    xhr.onreadystatechange = () => {
      const { status, readyState, response } = xhr
      if (status !== 200) return reject(response)
      if (readyState === 4) {
        return resolve(response)
      }
    }
    xhr.send()
  })
}
describe('isDICM', () => {
  test('isDICM', async () => {
    try {
      const res: any = await fetch(url)
      expect(isDICM(res)).toBe(true)
    } catch (error) {
      console.log(error)
    }
  })
  test('no isDICM', async () => {
    try {
      const res: any = await fetch(url2)
      expect(isDICM(res)).toBe(false)
    } catch (error) {
      console.log(error)
    }
  })
})