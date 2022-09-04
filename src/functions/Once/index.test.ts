import { Once } from "../../";

const once = new Once((...e:any[]) => e)
const params = ["hello", "world"]

describe("Once", () => {
  test("cache", () => {
    expect(once.run(...params)).toMatchObject(params)
    expect(once.run('hi')).toMatchObject(params)
    expect(once.run('？？')).toMatchObject(params)
  })

})