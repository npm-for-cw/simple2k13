
type ObjectStoreFunName = keyof IDBObjectStore
class IndexedDB {
  db?: IDBDatabase
  dbName: string
  storeName: string
  version: number
  constructor(dbName: string, storeName: string, version = 1) {
    this.db = undefined
    this.dbName = dbName
    this.storeName = storeName
    this.version = version
  }
  open() {
    return new Promise((resolve, reject) => {
      // @ts-ignore
      const myIndexedDB = indexedDB || webkitIndexedDB || mozIndexedDB || msIndexedDB
      if (!myIndexedDB) {
        const error = new Error('IndexedDB is not supported')
        console.warn(error)
        return reject(error)
      }
      const res: IDBOpenDBRequest = myIndexedDB.open(this.dbName, this.version)
      res.onsuccess = (event) => {
        // @ts-ignore
        this.db = event.target?.result // 数据库对象
        resolve(event)
      }
      res.onerror = function (event) {
        reject(event)
        console.log('数据库打开失败...')
      }
      res.onupgradeneeded = (event) => {
        // 数据库创建或升级的时候会触发
        const storeName = this.storeName
        // @ts-ignore
        const db = event.target?.result
        if (!db.objectStoreNames.contains(storeName)) {
          db.createObjectStore(storeName); // 创建表
        }
      }
    })
  }
  dispatch(func: ObjectStoreFunName, options: { mode?: IDBTransactionMode, more?: boolean } = {}, ...args: unknown[]): Promise<unknown> {
    const {
      mode = 'readwrite',
      more = false
    } = options

    return new Promise((resolve, reject) => {
      const objectStore = this.getObjectStore(mode)
      const storePrototype = objectStore[func]
      if (!(func in objectStore)) {
        return reject(`${func} is undefined, reference resources:https://developer.mozilla.org/zh-CN/docs/Web/API/IDBObjectStore`)
      }
      if (typeof storePrototype === 'function') {
        // @ts-ignore
        const res: IDBRequest = objectStore[func](...args)
        res.onsuccess = (event) => {
          // @ts-ignore
          const result = event.target?.result
          resolve(
            more
              ?
              {
                res,
                event,
                result,
                objectStore,
                bd: this.db,
              }
              :
              result)
        }
        res.onerror = reject
      } else {
        resolve(storePrototype)
      }
    })
  }
  getObjectStore(mode: IDBTransactionMode = 'readwrite'): IDBObjectStore {
    if (!this.db) {
      throw new Error('No database connection available , please use IndexedDB=>open to connect')
    }
    const transaction = this.db.transaction([this.storeName], mode); // 事务
    const objectStore = transaction.objectStore(this.storeName); // 仓库对象
    return objectStore
  }
}

export default IndexedDB