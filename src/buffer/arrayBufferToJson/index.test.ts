import { arrayBufferToJson } from '../..'
import { TextDecoder } from 'text-encoding';

window.TextDecoder = TextDecoder;
// @ts-ignore
Blob.prototype.arrayBuffer = function () {
  let fileReader = new FileReader();

  return new Promise((resolve, reject) => {
    fileReader.onload = function (event) {
      resolve(event.target?.result);
    };

    fileReader.onerror = function (error) {
      reject(error);
    };

    fileReader.readAsArrayBuffer(this);
  });
};

const data = {
  msg: 'success',
  code: 0,
  result: 'arrayBufferToJson'
}

const arrayBuffer = new Blob([JSON.stringify(data)], { type: 'application/json' }).arrayBuffer();

describe('arrayBufferToJson', () => {

  test('TextDecoder getArraybuffer', async () => {
    const response = await arrayBuffer;

    expect(arrayBufferToJson(response, true)).toMatchObject(data)
  })
  test('fromCharCode getArraybuffer2', async () => {
    // @ts-ignore
    window.TextDecoder = undefined
    const response = await arrayBuffer;

    expect(arrayBufferToJson(response, true)).toMatchObject(data)
  })
  test('error debug', () => {
    expect(arrayBufferToJson(new ArrayBuffer(10), true)).toBe(undefined)
  })
})