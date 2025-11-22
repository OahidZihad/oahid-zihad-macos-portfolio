import { create } from "zustand";
import { INITIAL_Z_INDEX, WINDOW_CONFIG } from "../constants";
import { immer } from "zustand/middleware/immer";

type WindowKey = keyof typeof WINDOW_CONFIG;

interface WindowState {
  isOpen: boolean;
  zIndex: number;
  data: unknown | null;
}

interface WindowStore {
  windows: Record<WindowKey, WindowState>;
  nextZIndex: number;
  openWindow: (windowKey: WindowKey, data?: unknown) => void;
  closeWindow: (windowKey: WindowKey) => void;
  focusWindow: (windowKey: WindowKey) => void;
}

const useWindowStore = create<WindowStore>()(
  immer((set) => ({
    windows: WINDOW_CONFIG as Record<WindowKey, WindowState>,
    nextZIndex: INITIAL_Z_INDEX + 1,

    openWindow: (windowKey, data = null) => {
      set((state) => {
        const win = state.windows[windowKey];
        if (win) {
          win.isOpen = true;
          win.zIndex = state.nextZIndex;
          win.data = data ?? win.data;
          state.nextZIndex++;
        }
      });
    },

    closeWindow: (windowKey) => {
      set((state) => {
        const win = state.windows[windowKey];
        if (win) {
          win.isOpen = false;
          win.zIndex = INITIAL_Z_INDEX;
          win.data = null;
        }
      });
    },

    focusWindow: (windowKey) => {
      set((state) => {
        const win = state.windows[windowKey];
        if (win) {
          win.zIndex = state.nextZIndex++;
        }
      });
    },
  }))
);

export default useWindowStore;
