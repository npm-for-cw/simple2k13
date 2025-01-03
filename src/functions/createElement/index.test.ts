import { createElement } from '../..'

describe("createElement", () => {
  test("SPAN", () => {
    expect(createElement({ tagName: "span" }).tagName).toBe("SPAN");
  });
  test("test", () => {
    expect(createElement({ className: "test" }).className).toBe("test");
  });
})