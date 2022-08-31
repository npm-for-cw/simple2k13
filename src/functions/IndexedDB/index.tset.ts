import { IndexedDB } from '../..'

let count: number;
let res: any;
describe('IndexedDB', () => {
  test('IndexedDB', async () => {
    var dbName = 'testDB';
    var version = 1;
    var dispatchName = 'appdispatch';
    const db = new IndexedDB(dbName, dispatchName, version)
    await db.open()
    await db.dispatch('put', { more: true }, '1', 'one')
    await db.dispatch('put', { more: false }, '2', 'two')
    await db.dispatch('put', undefined, '3', 'three')
    res = await db.dispatch('get', { more: false }, '1111', 'one')
    expect(res).toBe(1111)
    res = await db.dispatch('get', { more: true }, '1111', 'one')
    expect(res.result).toBe(1111)
    await db.dispatch('get', { more: true }, 'one')
    count = await db.dispatch('count', undefined)
    expect(count).toBe(3)
    await db.dispatch('delete', undefined, 'one')
    count = await db.dispatch('count', undefined)
    expect(count).toBe(2)
    await db.dispatch('clear', undefined)
    count = await db.dispatch('count', undefined)
    expect(count).toBe(0)
  })
})