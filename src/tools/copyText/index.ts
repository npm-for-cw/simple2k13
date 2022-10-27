const copyText = (content: string) => new Promise((resolve, reject) => {
  const clipboard = navigator.clipboard
  if (clipboard) {
    clipboard.writeText(content).then(
      () => {
        resolve('success')
      },
      (error) => {
        reject(error)
      }
    );
    return
  }
  if (document.execCommand) {
    const copyInput = document.createElement('input')
    document.body.appendChild(copyInput)
    copyInput.setAttribute('value', content)
    copyInput.select();
    try {
      document.execCommand('Copy');
      copyInput.remove()
      return resolve('success')
    } catch (error) {
      copyInput.remove()
      return reject(error)
    }
  }

  return reject('该浏览器不支持自动复制')
})
export default copyText