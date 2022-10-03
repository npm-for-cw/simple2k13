const throttle = (func: (...args: []) => void, wait = 0) => {
  let timOut = false;

  return (...args: []) => {
    if (timOut) return
    timOut = true
    func(...args)
    setTimeout(() => {
      timOut = false;
    }, wait)
  }
}

export default throttle