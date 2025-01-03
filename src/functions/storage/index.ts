/** @prettier  */
function getItem<T>(key: string, storage: Storage = localStorage): T | null {
  const item = storage.getItem(key);

  return item ? JSON.parse(item) : null;
}

function setItem(key: string, value: any, storage: Storage = localStorage) {
  storage.setItem(key, JSON.stringify(value));
}

function removeItem(key: string, storage: Storage = localStorage) {
  storage.removeItem(key);
}

export default { getItem, setItem, removeItem };
