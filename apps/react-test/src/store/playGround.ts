import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type SplitDirection = 'horizontal' | 'vertical';

interface PlayGroundStore {
  splitDirection: SplitDirection;
  splitSize: number;
  setSplitDirection: (splitDirection: SplitDirection) => void;
  setSplitSize: (splitSize: number) => void;
}

export const usePlayGroundStore = create(
  persist<PlayGroundStore>(
    (set) => ({
      splitDirection: 'horizontal',
      splitSize: 40,
      setSplitDirection: (splitDirection: SplitDirection) => set({ splitDirection }),
      setSplitSize: (splitSize: number) => set({ splitSize }),
    }),
    { name: '_zustand_playGround' }
  )
);
