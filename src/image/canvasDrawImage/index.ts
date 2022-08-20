
const canvasDrawImage = (canvas: HTMLCanvasElement, url: string, zoom: number = 4) => {
  return new Promise((resolve, reject) => {
    try {
      const ctx = canvas?.getContext('2d')
      let img = new Image()
      img.src = url
      img.onload = () => {
        const imgW = img.width * zoom
        const imgH = img.height * zoom
        ctx?.drawImage(img, (canvas.width - imgW) / 2, (canvas.height - imgH) / 2, imgW, imgH)
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