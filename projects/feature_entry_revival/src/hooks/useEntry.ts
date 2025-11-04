/**
 * Entry State Management Hook
 * Manages entry-related state
 */

import { useAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

export interface Entry {
  id: string;
  title: string;
  description?: string;
  status: 'active' | 'archived' | 'draft';
  createdAt: Date;
  updatedAt: Date;
}

// Atoms
export const entriesAtom = atomWithStorage<Entry[]>('entries', []);
export const selectedEntryAtom = atomWithStorage<Entry | null>('selectedEntry', null);
export const isLoadingAtom = atomWithStorage<boolean>('isLoading', false);
export const errorAtom = atomWithStorage<string | null>('error', null);

/**
 * Hook to manage entries
 */
export function useEntries() {
  const [entries, setEntries] = useAtom(entriesAtom);
  const [selectedEntry, setSelectedEntry] = useAtom(selectedEntryAtom);
  const [isLoading, setIsLoading] = useAtom(isLoadingAtom);
  const [error, setError] = useAtom(errorAtom);

  return {
    entries,
    setEntries,
    selectedEntry,
    setSelectedEntry,
    isLoading,
    setIsLoading,
    error,
    setError,
  };
}
