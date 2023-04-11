import { createElement } from '../..'

describe("createElement", () => {
  test('return {test:"1"}', () => {
    expect(createElement({ tagName: 'span' }).tagName).toBe('SPAN');
  })
  test('return {}', () => {
    expect(createElement({ className: 'test' }).className).toBe('test');
  })
})