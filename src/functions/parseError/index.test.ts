/** @format */

import { parseError } from "../..";

describe("parseError", () => {
  test("error1", () => {
    expect(parseError(new Error("error1")).message).toBe("error1");
  });

  test("error2", () => {
    expect(parseError("error2").message).toBe("error2");
  });
});
