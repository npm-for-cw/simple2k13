
interface Options {
  crossOrigin?: string
  zoom?: number
  debug?: boolean
}

export interface CanvasDrawImage {
  (canvas: HTMLCanvasElement, url: string, options?: Options): void
}

const canvasDrawImage: CanvasDrawImage = (canvas: HTMLCanvasElement, url: string, options: Options = {}) => {
  const {
    crossOrigin = 'Anonymous',
    zoom = 1,
    debug = false
  } = options
  return new Promise((resolve, reject) => {
    try {
      const ctx = canvas?.getContext('2d')
      const cW = canvas.width
      const cH = canvas.height
      let scale = 1

      const img = new Image()
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

        debug && console.log({
          cW,
          cH,
          scale,
          zoom,
          originIW: img.width,
          originIH: img.height,
          iW,
          iH
        })

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