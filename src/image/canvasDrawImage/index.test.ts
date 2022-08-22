import 'jest-canvas-mock';
import { canvasDrawImage } from '../../'


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
      const result = await canvasDrawImage(canvas, 'successUrl', 4)
      expect(result).toBe('success')
    } catch (error) {
      console.log(error)
    }
  })
  test('drawImage failure', async () => {
    try {
      await canvasDrawImage(canvas, 'failureUrl', 4)
    } catch (error) {
      expect(error).toBeDefined()
      console.log(error)
    }
  })
})

