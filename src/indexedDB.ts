import { ItemType } from "./types"

export let db: IDBDatabase

export const initDB = () => {
  return new Promise((resolve, reject) => {
    console.log('starting db...')
    const request = indexedDB.open('GroceryBlissDB', 1)

    request.onupgradeneeded = (e) => {
      console.log('in upgrade needed')
      db = (e.target as IDBOpenDBRequest).result
      if (!db.objectStoreNames.contains('items')) {
        db.createObjectStore('items', { keyPath: 'id' })
      }
    }

    request.onsuccess = (e) => {
      db = (e.target as IDBOpenDBRequest).result
      resolve(db)
      console.log('db successfully started')
    }

    request.onerror = (e) => {
      reject((e.target as IDBOpenDBRequest).error)
    }

  })
 
}

// CRUD Ops
export const addItemDB = (item: ItemType) => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(['items'], "readwrite")
    const store = transaction.objectStore('items')
    const request = store.add(item)

    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
    
  })
}

export const getItemsDB = () => {
  console.log('getItems called...')
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(['items'], 'readonly')
    const store = transaction.objectStore('items')
    const request = store.getAll()
  
    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
  })
  
}

export const updateItemDB = (item: ItemType) => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(['items'], 'readwrite')
    const store = transaction.objectStore('items')
    const request = store.put(item)
    
    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
  })
} 

export const deleteItemDB = (itemId: string) => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(['items'], 'readwrite')
    const store = transaction.objectStore('items')
    const request = store.delete(itemId)
    
    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
  })
}
