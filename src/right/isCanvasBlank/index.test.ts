import { isCanvasBlank } from '../..'

const canvas = document.createElement('canvas')
canvas.width = 400
canvas.height = 400


describe('isCanvasBlank', () => {
  test('yes', () => {
    expect(isCanvasBlank(canvas)).toBe(true)
  })
})

