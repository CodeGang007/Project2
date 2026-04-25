'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode
} from 'react';

export type CompareEntry = {
  category: string;
  productId: string;
};

type CompareState = {
  entries: CompareEntry[];
  max: number;
  add: (entry: CompareEntry) => boolean;
  remove: (productId: string) => void;
  toggle: (entry: CompareEntry) => boolean;
  has: (productId: string) => boolean;
  clear: () => void;
  isFull: boolean;
};

const CompareCtx = createContext<CompareState | null>(null);
const STORAGE_KEY = 'dynai.compare.v1';
const MAX_ENTRIES = 3;

export function CompareProvider({ children }: { children: ReactNode }) {
  const [entries, setEntries] = useState<CompareEntry[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) setEntries(parsed.slice(0, MAX_ENTRIES));
      }
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
    } catch {
      /* ignore */
    }
  }, [entries, hydrated]);

  const has = useCallback(
    (productId: string) => entries.some((e) => e.productId === productId),
    [entries]
  );

  const add = useCallback(
    (entry: CompareEntry) => {
      if (entries.some((e) => e.productId === entry.productId)) return true;
      if (entries.length >= MAX_ENTRIES) return false;
      setEntries((prev) => [...prev, entry]);
      return true;
    },
    [entries]
  );

  const remove = useCallback((productId: string) => {
    setEntries((prev) => prev.filter((e) => e.productId !== productId));
  }, []);

  const toggle = useCallback(
    (entry: CompareEntry) => {
      if (has(entry.productId)) {
        remove(entry.productId);
        return false;
      }
      return add(entry);
    },
    [add, has, remove]
  );

  const clear = useCallback(() => setEntries([]), []);

  const value = useMemo<CompareState>(
    () => ({
      entries,
      max: MAX_ENTRIES,
      add,
      remove,
      toggle,
      has,
      clear,
      isFull: entries.length >= MAX_ENTRIES
    }),
    [entries, add, remove, toggle, has, clear]
  );

  return <CompareCtx.Provider value={value}>{children}</CompareCtx.Provider>;
}

export function useCompare() {
  const ctx = useContext(CompareCtx);
  if (!ctx) throw new Error('useCompare must be used inside CompareProvider');
  return ctx;
}
