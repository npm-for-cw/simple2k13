
const dataType = (data: any):string => {
  let result = (typeof data)
  if (result === 'object') {
    return Object.prototype.toString.call(data).slice(8,-1)
  }
  return result
}

export default dataType