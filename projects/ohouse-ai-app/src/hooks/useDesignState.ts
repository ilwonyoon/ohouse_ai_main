/**
 * Design State Management with Jotai
 * Manages UI state for design flow
 */

import { useAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import type { Room, RoomDetails } from '@/types/room';
import type { DesignSuggestion } from '@/types/design';

// Atoms for room state
export const roomAtom = atomWithStorage<RoomDetails | null>('room', null);
export const savedRoomsAtom = atomWithStorage<Room[]>('rooms', []);

// Atoms for design state
export const currentDesignAtom = atomWithStorage<DesignSuggestion | null>(
  'currentDesign',
  null
);
export const designHistoryAtom = atomWithStorage<DesignSuggestion[]>(
  'designHistory',
  []
);

// Loading/Error states
export const isLoadingAtom = atomWithStorage<boolean>('isLoading', false);
export const errorAtom = atomWithStorage<string | null>('error', null);

/**
 * Hook to manage room details
 */
export function useRoomState() {
  const [room, setRoom] = useAtom(roomAtom);
  const [savedRooms] = useAtom(savedRoomsAtom);

  return {
    room,
    setRoom,
    savedRooms,
  };
}

/**
 * Hook to manage design suggestions
 */
export function useDesignState() {
  const [currentDesign, setCurrentDesign] = useAtom(currentDesignAtom);
  const [history] = useAtom(designHistoryAtom);
  const [isLoading, setIsLoading] = useAtom(isLoadingAtom);
  const [error, setError] = useAtom(errorAtom);

  return {
    currentDesign,
    setCurrentDesign,
    history,
    isLoading,
    setIsLoading,
    error,
    setError,
  };
}
