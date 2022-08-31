
import { PromiseQueue, ComputeStore, Once, IndexedDB } from './functions'
import { isNull, env, dataType } from './right'
import { canvasDrawImage } from './image'
import { arrayBufferToJson, isDICM } from './buffer'
import { importScript } from './import'
import { version } from '../package.json'

console.log(`simple2k13.js version: ${version}`)

export {
  version,
  PromiseQueue,
  ComputeStore,
  Once,
  IndexedDB,
  isNull,
  env,
  dataType,
  canvasDrawImage,
  arrayBufferToJson,
  isDICM,
  importScript
}
export default {
  version,
  PromiseQueue,
  ComputeStore,
  Once,
  IndexedDB,
  isNull,
  env,
  dataType,
  canvasDrawImage,
  arrayBufferToJson,
  isDICM,
  importScript
}
