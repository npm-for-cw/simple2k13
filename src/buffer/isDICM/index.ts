const isDICM = (buffer: Buffer) => {
  if (!buffer || !buffer.byteLength || buffer.byteLength <= 132) return false
  let str = ""
  const view = new Uint8Array(buffer, 128, 4)
  for (let i = 0; i < view.length; i++) {
    str += String.fromCharCode(view[i])
  }
  return (str === "DICM")
}
export default isDICM