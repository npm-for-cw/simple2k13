const arrayBuffer = (arrayBuffer: ArrayBuffer, debug: boolean = false) => {
  try {
    if (!!TextDecoder) {
      const enc = new TextDecoder("utf-8");
      return JSON.parse(enc.decode(new Uint8Array(arrayBuffer)))
    }
    var buffer: any = new Uint8Array(arrayBuffer);
    var decodedString = String.fromCharCode.apply(null, buffer);
    return JSON.parse(decodedString);
  } catch (error) {
    debug && console.log(error)
    return
  }
}
export default arrayBuffer