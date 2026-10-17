/**
 * IndexedDB and in-memory persistent storage for actual uploaded PDF files.
 * IndexedDB has virtually unlimited storage (>500MB) compared to localStorage (5MB),
 * allowing full original PDFs (e.g. 10MB, 20MB, 50MB, all 40+ pages) to be stored
 * and downloaded without any truncation or compression.
 */

const DB_NAME = 'EngiNotesFileDB';
const DB_VERSION = 1;
const STORE_NAME = 'pdf_files';

// In-memory instant cache for active session
const memoryFileCache = new Map<string, Blob>();

function openDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      reject(new Error('IndexedDB not supported'));
      return;
    }

    const request = window.indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

/**
 * Saves a full binary File or Blob to persistent storage.
 */
export async function saveOriginalFile(noteId: string, file: File | Blob): Promise<void> {
  // Store in instant in-memory cache
  memoryFileCache.set(noteId, file);

  try {
    const db = await openDatabase();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const request = store.put({ id: noteId, blob: file, updatedAt: Date.now() });

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  } catch (err) {
    console.warn('Could not persist file to IndexedDB, fallback to memory cache:', err);
  }
}

/**
 * Retrieves the full original binary File or Blob.
 */
export async function getOriginalFile(noteId: string): Promise<Blob | null> {
  // Check memory cache first
  if (memoryFileCache.has(noteId)) {
    return memoryFileCache.get(noteId) || null;
  }

  try {
    const db = await openDatabase();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const request = store.get(noteId);

      request.onsuccess = () => {
        if (request.result && request.result.blob) {
          memoryFileCache.set(noteId, request.result.blob);
          resolve(request.result.blob);
        } else {
          resolve(null);
        }
      };
      request.onerror = () => reject(request.error);
    });
  } catch (err) {
    console.warn('Error reading file from IndexedDB:', err);
    return null;
  }
}

/**
 * Synchronous check for memory cache.
 */
export function getCachedFile(noteId: string): Blob | null {
  return memoryFileCache.get(noteId) || null;
}

/**
 * Removes an original binary file from both in-memory cache and IndexedDB.
 */
export async function removeOriginalFile(noteId: string): Promise<void> {
  memoryFileCache.delete(noteId);
  try {
    const db = await openDatabase();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const request = store.delete(noteId);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  } catch (err) {
    console.warn('Error removing file from IndexedDB:', err);
  }
}

/**
 * Clears all original stored binary files from in-memory cache and IndexedDB.
 */
export async function clearAllOriginalFiles(): Promise<void> {
  memoryFileCache.clear();
  try {
    const db = await openDatabase();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const request = store.clear();
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  } catch (err) {
    console.warn('Error clearing IndexedDB file store:', err);
  }
}
