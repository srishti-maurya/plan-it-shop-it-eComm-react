import { useCallback, useSyncExternalStore } from "react";

const STORAGE_KEY = "recentlyViewed";
const MAX_ITEMS = 10;

function getSnapshot(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

let cachedIds = getSnapshot();

function subscribe(onStoreChange: () => void) {
  const handler = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) {
      cachedIds = getSnapshot();
      onStoreChange();
    }
  };
  window.addEventListener("storage", handler);
  return () => window.removeEventListener("storage", handler);
}

function getSnapshotCached() {
  return cachedIds;
}

function write(ids: string[]) {
  cachedIds = ids;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
}

export function useRecentlyViewed() {
  const productIds = useSyncExternalStore(subscribe, getSnapshotCached);

  const addProduct = useCallback((id: string) => {
    const current = getSnapshot();
    const deduped = [id, ...current.filter((x) => x !== id)].slice(
      0,
      MAX_ITEMS
    );
    write(deduped);
    // Force re-render in the same tab (storage event only fires cross-tab)
    cachedIds = deduped;
  }, []);

  const clearAll = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    cachedIds = [];
  }, []);

  return { productIds, addProduct, clearAll };
}
