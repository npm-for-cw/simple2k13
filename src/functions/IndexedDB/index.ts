
type ObjectStoreFunName = keyof IDBObjectStore
class IndexedDB {
  db: any
  dbName: string
  storeName: string
  version: number
  constructor(dbName: string, storeName: string, version: number = 1) {
    this.db = undefined
    this.dbName = dbName
    this.storeName = storeName
    this.version = version
  }
  open() {
    return new Promise((resolve, reject) => {
      // @ts-ignore
      const myIndexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.msIndexedDB
      if (!myIndexedDB) {
        const error = new Error('IndexedDB is not supported')
        console.warn(error)
        return reject(error)
      }
      const res = window.indexedDB.open(this.dbName, this.version)
      res.onsuccess = (event: any) => {
        this.db = event.target.result // 数据库对象
        resolve(event)
      }
      res.onerror = function (event) {
        reject(event)
        console.log('数据库打开失败...')
      }
      res.onupgradeneeded = (event: any) => {
        // 数据库创建或升级的时候会触发
        const storeName = this.storeName
        const db = event.target.result
        if (!db.objectStoreNames.contains(storeName)) {
          db.createObjectStore(storeName); // 创建表
        }
      }
    })
  }
  store(func: ObjectStoreFunName, options: { mode?: string, more?: Boolean } = {}, ...args: any[]): Promise<any> {
    const {
      mode = 'readwrite',
      more = false
    } = options

    return new Promise(async (resolve, reject) => {
      const objectStore = await this.getObjectStore(mode)
      const storePrototype = objectStore[func]
      if (!(func in objectStore)) {
        return reject(`${func} is undefined, reference resources:https://developer.mozilla.org/zh-CN/docs/Web/API/IDBObjectStore`)
      }
      if (typeof storePrototype == 'function') {
        // @ts-ignore
        const res = objectStore[func](...args)
        res.onsuccess = (event: any) => {
          const result = event.target.result
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
  getObjectStore(mode: string): Promise<IDBObjectStore> {
    return new Promise((resolve) => {
      if (!this.db) {
        setTimeout(async () => resolve(await this.getObjectStore(mode)))
        return
      }
      const transaction = this.db.transaction([this.storeName], mode); // 事务
      const objectStore = transaction.objectStore(this.storeName); // 仓库对象
      resolve(objectStore)
    })
  }
}

export default IndexedDB