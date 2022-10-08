const throttle = (func: (...args: []) => void, wait = 0) => {
  let enable = true;

  return (...args: []) => {
    if (!enable) return
    enable = false
    func(...args)
    setTimeout(() => {
      enable = true;
    }, wait)
  }
}

export default throttle