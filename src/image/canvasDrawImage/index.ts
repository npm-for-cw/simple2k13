
const canvasDrawImage = (canvas: HTMLCanvasElement, url: string, zoom: number = 1) => {
  return new Promise((resolve, reject) => {
    try {
      const ctx = canvas?.getContext('2d')
      const cW = canvas.width
      const cH = canvas.height
      let scale = 1

      let img = new Image()
      img.src = url
      img.onload = () => {
        let iW = img.width
        let iH = img.height
        if (cW <= iH) {
          scale = cW / iW
        } else {
          scale = cH / iH
        }
        iW = iW * scale * zoom
        iH = iH * scale * zoom
        ctx?.drawImage(img, (cW - iW) / 2, (cH - iH) / 2, iW, iH)
        resolve('success')
      }
      img.onerror = (error) => {
        reject(error)
      }
    } catch (error) {
      reject(error)
    }
  })
}
export default canvasDrawImage