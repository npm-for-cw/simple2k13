import { resolve } from 'path';
import { copyText } from '../..'



let content = String(Math.random() * 1000)

beforeEach(() => {
  const mockClipboard = {
    writeText: jest.fn(
      (data) => {
        return new Promise((resolve) => {
          content = data
          resolve('')
        })
      }
    )
  };
  // @ts-ignore
  global.navigator.clipboard = mockClipboard;
  // @ts-ignore
  document.execCommand = jest.fn((data) => data)

});

describe('copyText', () => {
  test('navigator.clipboard', async () => {
    try {
      const result = await copyText(content)
      expect(result).toBe('success')
    } catch (error) {
      console.log(error)
    }
  })
  test('execCommand', async () => {
    // @ts-ignore
    global.navigator.clipboard = undefined
    try {
      const result = await copyText(content)
      expect(result).toBe('success')
    } catch (error) {
      console.log(error)
    }
  })
  test('error', async () => {
    // @ts-ignore
    global.navigator.clipboard = undefined
    // @ts-ignore
    document.execCommand = undefined
    try {
      await copyText(content)
    } catch (error) {
      expect(error).toBe('该浏览器不支持自动复制')
      console.log(error)
    }
  })
})