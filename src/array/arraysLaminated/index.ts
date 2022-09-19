import { dataType } from '../../'

const arraysLaminated = (...args: (unknown[])[]) => {
  const result: unknown[] = []
  const argLen = args.length
  for (let i = 0; i < argLen; i++) {
    const item = args[i]
    if (dataType(item) !== 'Array') {
      continue
    }
    item.forEach((value: unknown, j: number) => {
      result[i + j * argLen] = value
    })
  }

  return result.filter(v => v != undefined)
}
export default arraysLaminated