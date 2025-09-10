import { ImageDataToDataURL, ImageDataToImage, ImageDataToArraybuffer, arrayBufferToImage } from '../..'


require('jest-fetch-mock').enableMocks()

beforeAll(() => {
  Object.defineProperty(global.Image.prototype, 'src', {
    set(src) {
      setTimeout(() => this.onload());
    },
  });

  // 模拟 URL.createObjectURL 和 URL.revokeObjectURL
  global.URL.createObjectURL = jest.fn(() => 'mock-url');
  global.URL.revokeObjectURL = jest.fn();
});

const imageData = new ImageData(new Uint8ClampedArray([255, 255, 255, 255]), 1, 1)

describe('ImageDataTo', () => {
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
  test('arrayBufferToImage success', async () => {
    try {
      const canvas = document.createElement('canvas');
      canvas.width = 1;
      canvas.height = 1;

      const ctx = canvas.getContext('2d')!;
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, 1, 1);

      const blob = await new Promise<Blob>((resolve, reject) => canvas.toBlob((blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error('Failed to create blob from canvas'));
        }
      }, 'image/png'));

      // 使用 FileReader API 兼容 Jest 环境
      const arrayBuffer = await new Promise<ArrayBuffer>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as ArrayBuffer);
        reader.onerror = reject;
        reader.readAsArrayBuffer(blob);
      });

      const result = await arrayBufferToImage(arrayBuffer);

      expect(result).toBeInstanceOf(HTMLImageElement);
    } catch (error) {
      throw error;
    }
  })
})