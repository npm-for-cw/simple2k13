
const isCanvasBlank = (canvas:HTMLCanvasElement) => {
  const blank = document.createElement('canvas');
  blank.width = canvas.width;
  blank.height = canvas.height;
  return canvas.toDataURL() == blank.toDataURL();
}

export default isCanvasBlank