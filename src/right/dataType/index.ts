
const dataType = (data: any, options?: { lowercase: boolean }): string => {
  const result = (typeof data)
  const { lowercase = false } = options || {}

  if (result === 'object') {
    const result = Object.prototype.toString.call(data).slice(8, -1)
    return lowercase ? result.toLowerCase() : result
  }
  return result
}

export default dataType