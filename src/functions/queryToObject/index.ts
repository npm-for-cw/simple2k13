

function queryToObject(search?: string) {
  search = search || location.search
  const result: {
    [params: string]: string
  } = {}

  if (typeof URLSearchParams === 'function') {
    const searchEntries = new URLSearchParams(search)
    for (const [key, value] of searchEntries) {
      result[key] = value
    }
  } else {
    const paramLists = search.replace('?', '').split('&')
    for (const param of paramLists) {
      const [key, value] = param.split('=')
      result[key] = value
    }
  }
  return result
}
export default queryToObject