import { dataType } from '../..'
interface Options {
  interceptors?: () => Promise<boolean>
  crossOrigin?: string
  zoom?: number
  debug?: boolean
}

export interface CanvasDrawImage {
  (canvas: HTMLCanvasElement, url: string, options?: Options): Promise<unknown>
}

const canvasDrawImage: CanvasDrawImage = (canvas, url, options = {}) => {
  const {
    interceptors,
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
        const [dx, dy, dw, dh] = [(cW - iW) / 2, (cH - iH) / 2, iW, iH]
        if (typeof interceptors === 'function') {
          const result = interceptors()
          if (dataType(result) !== 'Promise') throw reject(new Error('interceptors must be Promise'))
          result.then((e) => {
            e && ctx?.drawImage(img, dx, dy, dw, dh)
            resolve('success')
          })
          return
        }
        ctx?.drawImage(img, dx, dy, dw, dh)
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