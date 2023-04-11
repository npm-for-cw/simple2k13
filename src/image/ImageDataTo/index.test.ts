import { ImageDataToDataURL, ImageDataToImage, ImageDataToArraybuffer } from '../..'


require('jest-fetch-mock').enableMocks()

beforeAll(() => {
  Object.defineProperty(global.Image.prototype, 'src', {
    set(src) {
      setTimeout(() => this.onload());
    },
  });
});

const imageData = new ImageData(new Uint8ClampedArray([255, 255, 255, 255]), 1, 1)
describe('ImageDataToDataURL', () => {
  test('ImageDataToDataURL success', async () => {
    try {
      const result = await ImageDataToDataURL(imageData)
      expect(result).toMatch('base64')
    } catch (error) {
      throw error
    }
  })
  test('ImageDataToImage success', async () => {
    try {
      const result = await ImageDataToImage(imageData) as typeof Image
      // @ts-ignore
      expect(result.src).toBe('')
    } catch (error) {
      throw error
    }
  })
  test('ImageDataToArraybuffer success', async () => {
    try {
      const result = await ImageDataToArraybuffer(imageData)
      expect(result.byteLength).toBe(0)
    } catch (error) {
      throw error
    }
  })
})

