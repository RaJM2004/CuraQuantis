// Robust client-side document storage using browser IndexedDB (bypasses 5MB localStorage limit)
const DB_NAME = 'CuraQuantisDocVault_v1';
const DB_VERSION = 1;
const STORE_NAME = 'application_files';

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      return reject(new Error('IndexedDB not supported in this environment'));
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'key' });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export const DocumentVault = {
  saveDocument: async (key: string, fileData: { fileName: string; fileDataUrl: string; mimeType?: string }): Promise<void> => {
    try {
      const db = await openDB();
      const keysToSave = [
        key,
        key.toLowerCase(),
        key.replace(/\s+/g, '_'),
        fileData.fileName,
        fileData.fileName.toLowerCase(),
        fileData.fileName.replace(/\s+/g, '_')
      ];

      return new Promise((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, 'readwrite');
        const store = tx.objectStore(STORE_NAME);
        
        keysToSave.forEach(k => {
          store.put({ key: k, ...fileData, savedAt: new Date().toISOString() });
        });

        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
      });
    } catch (err) {
      console.warn('[DocumentVault] Error saving document to IndexedDB', err);
    }
  },

  getDocument: async (key: string): Promise<{ fileName: string; fileDataUrl: string; mimeType?: string } | null> => {
    try {
      const db = await openDB();
      return new Promise((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, 'readonly');
        const store = tx.objectStore(STORE_NAME);
        const req = store.get(key);
        req.onsuccess = () => resolve(req.result || null);
        req.onerror = () => reject(req.error);
      });
    } catch (err) {
      console.warn('[DocumentVault] Error reading document from IndexedDB', err);
      return null;
    }
  },

  findDocument: async (keys: (string | undefined | null)[]): Promise<{ fileName: string; fileDataUrl: string; mimeType?: string } | null> => {
    try {
      const validKeys = keys.filter((k): k is string => Boolean(k && k.trim() !== ''));
      for (const k of validKeys) {
        const found = await DocumentVault.getDocument(k);
        if (found?.fileDataUrl) return found;
        const foundLower = await DocumentVault.getDocument(k.toLowerCase());
        if (foundLower?.fileDataUrl) return foundLower;
        const foundUnderscore = await DocumentVault.getDocument(k.replace(/\s+/g, '_'));
        if (foundUnderscore?.fileDataUrl) return foundUnderscore;
      }
    } catch (err) {
      console.warn('[DocumentVault] Error searching keys in vault', err);
    }
    return null;
  },

  removeDocument: async (key: string): Promise<void> => {
    try {
      const db = await openDB();
      return new Promise((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, 'readwrite');
        const store = tx.objectStore(STORE_NAME);
        store.delete(key);
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
      });
    } catch (err) {
      console.warn('[DocumentVault] Error deleting document', err);
    }
  }
};
