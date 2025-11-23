import { create } from "zustand";
import { INITIAL_Z_INDEX, WINDOW_CONFIG } from "../constants";
import { immer } from "zustand/middleware/immer";
import gsap from "gsap";

type WindowKey = keyof typeof WINDOW_CONFIG;

interface WindowState {
  isOpen: boolean;
  isMaximized: boolean;
  zIndex: number;
  data: unknown | null;
  position?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}

interface WindowStore {
  windows: Record<WindowKey, WindowState>;
  nextZIndex: number;
  openWindow: (windowKey: WindowKey, data?: unknown) => void;
  closeWindow: (windowKey: WindowKey) => void;
  focusWindow: (windowKey: WindowKey) => void;
  toggleMaximize: (windowKey: WindowKey) => void;
}

const useWindowStore = create<WindowStore>()(
  immer((set) => ({
    windows: (() => {
      const initialWindows = {} as Record<WindowKey, WindowState>;
      (Object.entries(WINDOW_CONFIG) as [WindowKey, WindowState][]).forEach(([key, value]) => {
        initialWindows[key] = {
          ...value,
          isMaximized: false,
          position: undefined
        };
      });
      return initialWindows;
    })(),
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

    toggleMaximize: (windowKey) => {
      set((state) => {
        const win = state.windows[windowKey];
        if (win) {
          const el = document.getElementById(windowKey);
          if (el) {
            if (win.isMaximized) {
              // Restore
              if (win.position) {
                gsap.to(el, {
                  x: win.position.x,
                  y: win.position.y,
                  width: win.position.width,
                  height: win.position.height,
                  duration: 0.2,
                  ease: 'power2.inOut',
                  onComplete: () => {
                    el.style.borderRadius = '8px';
                  }
                });
              }
            } else {
              // Maximize
              const rect = el.getBoundingClientRect();
              win.position = {
                x: rect.left,
                y: rect.top,
                width: rect.width,
                height: rect.height
              };
              
              // Ensure the window is positioned at top: 0, left: 0 when maximized
              el.style.top = '0';
              el.style.left = '0';
              
              gsap.to(el, {
                x: 0,
                y: 0,
                width: '100%',
                height: '100%',
                duration: 0.2,
                ease: 'power2.inOut',
                onStart: () => {
                  el.style.borderRadius = '0';
                }
              });
            }
            win.isMaximized = !win.isMaximized;
          }
        }
      });
    },
  }))
);

export default useWindowStore;
