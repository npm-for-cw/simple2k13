
const isNull = (value: unknown): boolean => [undefined, `""`, `" "`, `null`, `[]`, `{}`].includes(JSON.stringify(value))
export default isNull