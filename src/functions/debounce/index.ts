

type GetType<T> = T extends (arg: infer P) => void ? P : string;

const debounce = (func: (...args: []) => void, wait = 0) => {
  let timer: GetType<typeof clearTimeout>

  return (...args: []) => {
    timer && clearTimeout(timer)
    timer = setTimeout(() => {
      func(...args)
    }, wait)
  }
}

export default debounce