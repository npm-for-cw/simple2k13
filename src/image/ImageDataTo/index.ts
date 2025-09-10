const ImageDataToDataURL = (ImageData: ImageData, quality: any = "image/png") => {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');

  canvas.height = ImageData.height;
  canvas.width = ImageData.width;
  context?.putImageData(ImageData, 0, 0);
  return canvas.toDataURL(quality)
};

const ImageDataToImage = (ImageData: ImageData, quality?: any) => new Promise((resolve, reject) => {
  const dataURL = ImageDataToDataURL(ImageData, quality)
  const image = new Image();

  image.src = dataURL
  image.onload = () => {
    resolve(image);
  };
  image.onerror = (error) => {
    reject(error);
  };
});

const ImageDataToArraybuffer = async (ImageData: ImageData, quality?: any) => {
  try {
    const dataURL = ImageDataToDataURL(ImageData, quality)
    const result = await fetch(dataURL)

    return Promise.resolve(result.arrayBuffer())
  } catch (error) {
    return Promise.reject(error)
  }
}


const arrayBufferToImage = (arrayBuffer: ArrayBuffer | ArrayLike<number> ): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    const arrayBufferView = new Uint8Array(arrayBuffer);
    const blob = new Blob([arrayBufferView]);
    const urlCreator = window.URL || window.webkitURL;
    const imageUrl = urlCreator.createObjectURL(blob);

    image.src = imageUrl;
    image.onload = () => {
      resolve(image);
      urlCreator.revokeObjectURL(imageUrl);
    };

    image.onerror = (error) => {
      urlCreator.revokeObjectURL(imageUrl);
      reject(error);
    };
  });
}


export { arrayBufferToImage, ImageDataToDataURL, ImageDataToImage, ImageDataToArraybuffer };