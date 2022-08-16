
const isNull = (value: any): Boolean => [undefined, `""`, `" "`, `null`, `[]`, `{}`].includes(JSON.stringify(value))
export default isNull