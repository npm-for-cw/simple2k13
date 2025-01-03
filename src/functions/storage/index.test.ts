/** @format */

import { storage } from "../..";
const { getItem, setItem, removeItem } = storage;

describe("parseError", () => {
  test("setStorage", () => {
    expect(setItem("test", "test")).toBe(undefined);
  });
  test("getStorage", () => {
    expect(getItem("test")).toBe("test");
  });

  test("removeStorage", () => {
    expect(removeItem("test")).toBe(undefined);
    expect(getItem("test")).toBe(null);
  });
});
