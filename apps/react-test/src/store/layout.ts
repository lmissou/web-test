import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface LayoutStore {
  siderCollapsed: boolean;
  setSiderCollapsed: (siderCollapsed: boolean) => void;
}

export const useLayoutStore = create(
  persist<LayoutStore>(
    (set) => ({
      siderCollapsed: false,
      setSiderCollapsed: (siderCollapsed: boolean) => set({ siderCollapsed }),
    }),
    { name: '_zustand_layout' }
  )
);
