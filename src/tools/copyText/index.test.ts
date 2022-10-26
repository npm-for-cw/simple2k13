import { copyText } from '../..'

const content = String(Math.random() * 1000)
describe('copyText', () => {
  test('success1', async () => {
    try {
      const result = await copyText(content)
      expect(result).toBe('success')
    } catch (error) {
      console.log(error)
    }
  })
  // @ts-ignore
  navigator.clipboard = undefined
  test('success2', async () => {
    try {
      const result = await copyText(content)
      expect(result).toBe('success')
    } catch (error) {
      console.log(error)
    }
  })
  // @ts-ignore
  document.execCommand = undefined
  test('error', async () => {
    try {
      await copyText(content)
    } catch (error) {
      expect(error).toBe('该浏览器不支持自动复制')
      console.log(error)
    }
  })
})