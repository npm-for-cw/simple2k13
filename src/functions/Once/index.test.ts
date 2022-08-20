import { Once } from "../../";

const once = new Once((...e) => e)
const params = ["hello", "world"]

describe("Once", () => {
  test("cache", () => {
    expect(once.run(...params)).toEqual(expect.arrayContaining(params))
    expect(once.run('hi')).toEqual(expect.arrayContaining(params))
    expect(once.run('？？')).toEqual(expect.arrayContaining(params))
  })

})