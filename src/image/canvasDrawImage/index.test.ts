import 'jest-canvas-mock';
import { canvasDrawImage } from '../..'


const LOAD_FAILURE_SRC = 'failureUrl';
const LOAD_SUCCESS_SRC = 'successUrl';
const canvas = document.createElement('canvas')
canvas.width = 400
canvas.height = 400

beforeAll(() => {
  Object.defineProperty(global.Image.prototype, 'src', {
    set(src) {
      if (src === LOAD_FAILURE_SRC) {
        setTimeout(() => this.onerror(new Error('mocked error')));
      } else if (src === LOAD_SUCCESS_SRC) {
        setTimeout(() => this.onload());
      }
    },
  });
});

describe('canvasDrawImage', () => {
  test('drawImage success', async () => {
    try {
      const result = await canvasDrawImage(canvas, 'successUrl')
      expect(result).toBe('success')
    } catch (error) {
      throw error
    }
  })

  test('drawImage failure', async () => {
    try {
      await canvasDrawImage(canvas, 'failureUrl')
    } catch (error) {
      expect(error).toBeDefined()
      // console.log(error)
    }
  })

  test('drawImage interceptors success', async () => {
    try {
      const result = await canvasDrawImage(canvas, 'successUrl', {
        interceptors: () => Promise.resolve(true)
      })
      expect(result).toBe('success')
    } catch (error) {
      throw error
    }
  })

  test('drawImage interceptors must be Promise', async () => {
    try {
      await canvasDrawImage(canvas, 'failureUrl', {
        interceptors: () => Promise.resolve(true)
      })
    } catch (error) {
      expect(error).toBeDefined()
    }
  })
})

