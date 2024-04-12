/** @format */

import {
  PromiseQueue,
  ComputeStore,
  Once,
  IndexedDB,
  objectToQuery,
  queryToObject,
  debounce,
  throttle,
  createElement,
} from "./functions";
import { arraysLaminated } from "./array";
import { isNull, isCanvasBlank, env, dataType } from "./right";
import {
  canvasDrawImage,
  ImageDataToDataURL,
  ImageDataToImage,
  ImageDataToArraybuffer,
} from "./image";
import { arrayBufferToJson, isDICM } from "./buffer";
import { importScript } from "./import";
import { httpRequest } from "./modern";
import { copyText } from "./tools";
import _package from "../package.json";

const { version } = _package;

export {
  version,
  PromiseQueue,
  ComputeStore,
  Once,
  IndexedDB,
  objectToQuery,
  queryToObject,
  arraysLaminated,
  debounce,
  throttle,
  createElement,
  isNull,
  isCanvasBlank,
  env,
  dataType,
  canvasDrawImage,
  ImageDataToDataURL,
  ImageDataToImage,
  ImageDataToArraybuffer,
  arrayBufferToJson,
  isDICM,
  importScript,
  httpRequest,
  copyText,
};
export default {
  version,
  PromiseQueue,
  ComputeStore,
  Once,
  IndexedDB,
  objectToQuery,
  queryToObject,
  arraysLaminated,
  debounce,
  throttle,
  createElement,
  isNull,
  isCanvasBlank,
  env,
  dataType,
  canvasDrawImage,
  ImageDataToDataURL,
  ImageDataToImage,
  ImageDataToArraybuffer,
  arrayBufferToJson,
  isDICM,
  importScript,
  httpRequest,
  copyText,
};
