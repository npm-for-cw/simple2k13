import { IndexedDB } from '../..'

let count: number;
let res: any;
describe('IndexedDB', () => {
  test('IndexedDB', async () => {
    var dbName = 'testDB';
    var version = 1;
    var storeName = 'appStore';
    const db = new IndexedDB(dbName, storeName, version)
    await db.open()
    await db.store('put', { more: true }, '1', 'one')
    await db.store('put', { more: false }, '2', 'two')
    await db.store('put', undefined, '3', 'three')
    res = await db.store('get', { more: false }, '1111', 'one')
    expect(res).toBe(1111)
    res = await db.store('get', { more: true }, '1111', 'one')
    expect(res.result).toBe(1111)
    await db.store('get', { more: true }, 'one')
    count = await db.store('count', undefined)
    expect(count).toBe(3)
    await db.store('delete', undefined, 'one')
    count = await db.store('count', undefined)
    expect(count).toBe(2)
    await db.store('clear', undefined)
    count = await db.store('count', undefined)
    expect(count).toBe(0)
  })
})