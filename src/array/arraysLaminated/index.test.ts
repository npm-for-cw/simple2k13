import { arraysLaminated } from '../..'

describe('ArrayLaminated', () => {
  test('success', () => {
    const result = arraysLaminated(
      1,
      "1",
      [],
      {},
      true,
      [0, undefined, null, , 0],
      [1, 1, 1, 1, 1],
      [2, 2, 3],
      [3],
      [4, 4, 4, 4, 4, 4],
      new Array(5).fill(5),
      new Array(6).fill(6)
    )
    expect(result).toMatchObject([0, 1, 2, 3, 4, 5, 6, 1, 2, 4, 5, 6, 1, 3, 4, 5, 6, 1, 4, 5, 6, 0, 1, 4, 5, 6, 4, 6])
  })
  test('success2', () => {
    const result = arraysLaminated()
    expect(result).toMatchObject([])
  })
})
