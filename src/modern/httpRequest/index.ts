
export interface OpenArgv extends XMLHttpRequestAttribute {
  method?: string
  async?: boolean
  username?: string | null
  password?: string | null
  [func: string]: any | undefined
}

type XMLHttpRequestAttribute<T = Pick<XMLHttpRequest, 'responseType' | 'timeout' | 'withCredentials'>> = {
  [K in keyof T]?: T[K]

}

const httpRequest = (url: string, options: OpenArgv = {}, callback?: (params: any) => void): Promise<XMLHttpRequest> => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    if (typeof callback === 'function') callback(xhr)
    xhr.onreadystatechange = () => {
      const { status, readyState } = xhr
      if (readyState === 0 || readyState === 1) return
      if (status !== 200) return reject(xhr)
      if (readyState === 4) {
        return resolve(xhr)
      }
    }
    xhr.onerror = () => {
      reject(xhr)
    }
    const { method = 'GET', async = true, username, password, send, open, ...rest } = options
    xhr.open(method, url, async, username, password)
    for (const [key, value] of Object.entries(rest)) {
      if (!(key in xhr)) {
        return reject(`${key} is undefined, reference resources: https://www.w3school.com.cn/xmldom/dom_http.asp`)
      }
      //@ts-ignore
      if (typeof xhr[key] == 'function') {
        //@ts-ignore
        const { args } = value;
        if (!!args && (args.constructor === Array)) {
          //@ts-ignore
          xhr[key](...value)
        } else {
          //@ts-ignore
          xhr[key](value)
        }
      } else {
        //@ts-ignore
        xhr[key] = value
      }
    }
    xhr.send(send)
  })
};

export default httpRequest