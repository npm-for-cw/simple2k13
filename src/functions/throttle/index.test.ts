/** @format */

import { throttle } from "../..";

const wait = 1_000;
let count = 0;

const func = (wait) =>
  new Promise((reject) => {
    setTimeout(() => {
      reject("");
    }, wait);
  });

const myThrottle = throttle(
  () => {
    count += 1;
  },
  wait,
  { leading: true, trailing: false }
);

describe("throttle", () => {
  test("count toEqual 0", () => {
    expect(count).toEqual(0);
    myThrottle();
    expect(count).toEqual(1);
    myThrottle();
    myThrottle();
    myThrottle();
    myThrottle();
    myThrottle();
    expect(count).toEqual(1);
  });
  test("count toEqual 1", async () => {
    await func(wait);
    expect(count).toEqual(1);
  });
  test("TypeError", () => {
    // @ts-ignore
    expect(()=>throttle(undefined, wait)).toThrow(TypeError);
  });
});
