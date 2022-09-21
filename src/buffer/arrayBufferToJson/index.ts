const arrayBufferToJson = (arrayBuffer: ArrayBuffer, debug = false) => {
  try {
    if (TextDecoder) {
      const enc = new TextDecoder("utf-8");
      return JSON.parse(enc.decode(new Uint8Array(arrayBuffer)))
    }
    const buffer = new Uint8Array(arrayBuffer);
    // @ts-ignore
    const decodedString = String.fromCharCode.apply(null, buffer);
    return JSON.parse(decodedString);
  } catch (error) {
    debug && console.log(error)
    return
  }
}
export default arrayBufferToJson