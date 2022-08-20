
class IndexedDB {
  db: any
  dbName: string
  storeName: string
  version: number
  constructor(dbName, storeName, version = 1) {
    this.db = undefined
    this.dbName = dbName
    this.storeName = storeName
    this.version = version
  }
  create() {
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
        console.log('数据库打开成功...');

      }
      res.onerror = function (event) {
        reject(event)
        console.log('数据库打开失败...')
      }
      res.onupgradeneeded = (event: any) => {
        // 数据库创建或升级的时候会触发
        this.db = event.target.result
        resolve(this.db)
        if (!this.db.objectStoreNames.contains(this.storeName)) {
          this.db.createObjectStore(this.storeName); // 创建表
        }
      }
    })
  }
  addData(key, val) {
    return new Promise((resolve, reject) => {
      let res = this.db.transaction([this.storeName], 'readwrite').objectStore(this.storeName).put(val, key)
      res.onsuccess = resolve
      res.onerror = reject
    })
  };

  delData(key) {
    return new Promise((resolve, reject) => {
      let res = this.db.transaction([this.storeName], 'readwrite').objectStore(this.storeName).delete(key)
      res.onsuccess = resolve
      res.onerror = reject
    })
  }
  getData = function (key) {
    return new Promise((resolve, reject) => {
      let res = this.db.transaction([this.storeName]).objectStore(this.storeName).get(key);
      res.onsuccess = resolve
      res.onerror = reject
    })
  };
  clearData = function () {
    return new Promise((resolve, reject) => {
      let transaction = this.db.transaction([this.storeName], 'readwrite'); // 事务
      let objectStore = transaction.objectStore(this.storeName); // 仓库对象
      let res = objectStore.count();
      res.onsuccess = resolve
      res.onerror = reject
    })
  };
}


// var dbName = 'DicomViewDB';
// var version = 1;
// var storeName = 'DicomStore';
// const db = new IndexedDB(dbName, storeName, version)
//db.addData('波多野结衣', "http://192.168.29.233:8063/Wado/GetImageThumb/2140");
// db.getData('http://192.168.29.233:8063/Wado/GetImageThumb/2140').then(function (res) {
//     console.log(res);
// }, function (error) {
//     console.log(error);

// });