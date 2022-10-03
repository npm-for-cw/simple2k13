import { readFileSync } from 'fs'
import path from 'path'
import { isDICM } from '../..'

const reader = (_path: string) => readFileSync(path.join(__dirname, _path))

function toArrayBuffer(buf: Buffer) {
  var ab = new ArrayBuffer(buf.length);
  var view = new Uint8Array(ab);
  for (var i = 0; i < buf.length; ++i) {
    view[i] = buf[i];
  }
  return ab;
}

describe('isDICM', () => {
  test('isDICM', () => {
    expect(isDICM(toArrayBuffer(reader('./static/isDICM.dcm')))).toBe(true)
  })
  test('no isDICM', () => {
    expect(isDICM(toArrayBuffer(reader('./static/noIsDICM.png')))).toBe(false)
  })
})


// jest.setTimeout(1_000 * 15)
// const url = 'https://cdn.jsdelivr.net/gh/npm-for-cw/mockStaticFiles/simple2k13/dcm/isDICM.dcm'
// const url2 = 'https://files.catbox.moe/qg3pr1.png'
// describe('isDICM', () => {
//   test('isDICM', async () => {
//     try {
//       const { response }: any = await httpRequest(url, {
//         responseType: 'arraybuffer'
//       })
//       expect(isDICM(response)).toBe(true)
//     } catch (error) {
//       console.log(error)
//     }
//   })
//   test('no isDICM', async () => {
//     try {
//       const { response }: any = await httpRequest(url2, {
//         responseType: 'arraybuffer'
//       })
//       expect(isDICM(response)).toBe(false)
//     } catch (error) {
//       console.log(error)
//     }
//   })
// })