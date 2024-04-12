/** @format */

import { debounce } from "../..";

const wait = 1_000;
let count = 0;

const func = (wait) =>
  new Promise((reject) => {
    setTimeout(() => {
      reject("");
    }, wait + 100);
  });

const myDebounce = debounce(
  () => {
    count += 1;
  },
  wait,
  {
    maxWait: 2_000,
  }
);

describe("debounce", () => {
  test("count toEqual 0", () => {
    myDebounce();
    myDebounce();
    myDebounce();
    myDebounce();
    myDebounce();
    myDebounce();
    expect(count).toEqual(0);
  });
  test("count toEqual ", async () => {
    await func(wait);
    expect(count).toEqual(1);
    await func(wait);
    const myDebounce = debounce(
      () => {
        count += 1;
      },
      wait,
      {
        leading: true,
        trailing: true,
      }
    );
    await func(wait);
    myDebounce();
    myDebounce();
    myDebounce();
    myDebounce();
    await func(wait);
    expect(count).toEqual(3);
  });
  test("TypeError", () => {
    // @ts-ignore
    expect(() => debounce(undefined, wait)).toThrow(TypeError);
  });
});
