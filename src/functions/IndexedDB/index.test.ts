import { IndexedDB } from '../..'

let count: number;
let res: any;
describe('IndexedDB', () => {
  test('IndexedDB', async () => {
    const dbName = 'testDB';
    const version = 1;
    const dispatchName = 'appdispatch';
    const db = new IndexedDB(dbName, dispatchName, version)
    await db.open()
    await db.dispatch('put', { more: true }, 1, 'one')
    await db.dispatch('put', { more: false }, 2, 'two')
    await db.dispatch('put', undefined, 3, 'three')
    res = await db.dispatch('get', { more: false }, 'one')
    expect(res).toBe(1)
    res = await db.dispatch('get', { more: true }, 'two')
    expect(res.result).toBe(2)
    count = await db.dispatch('count', undefined) as number
    expect(count).toBe(3)
    await db.dispatch('delete', undefined, 'one')
    count = await db.dispatch('count', undefined) as number
    expect(count).toBe(2)
    await db.dispatch('clear', undefined)
    count = await db.dispatch('count', undefined) as number
    expect(count).toBe(0)
  })
})