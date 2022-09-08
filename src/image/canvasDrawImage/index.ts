
interface Options {
  crossOrigin?: string
  zoom?: number
}

const canvasDrawImage = (canvas: HTMLCanvasElement, url: string, options: Options = {}) => {
  const { crossOrigin = 'Anonymous', zoom = 1 } = options
  return new Promise((resolve, reject) => {
    try {
      const ctx = canvas?.getContext('2d')
      const cW = canvas.width
      const cH = canvas.height
      let scale = 1

      let img = new Image()
      img.crossOrigin = crossOrigin
      img.src = url
      img.onload = () => {
        let iW = img.width
        let iH = img.height
        if ((cW / cH) > (iW / iH)) {
          scale = cH / iH
        } else {
          scale = cW / iW
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