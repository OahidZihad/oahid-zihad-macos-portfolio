import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { locations } from "../constants";

type BaseLocation = {
  id: number;
  name: string;
  icon: string;
  kind: string;
  type?: string;
  children?: unknown[];
  position?: string;
  windowPosition?: string;
};

type Location = BaseLocation;

interface LocationState {
  activeLocation: Location | null;
  setActiveLocation: (location: Location | null) => void;
  resetActiveLocation: () => void;
}

const DEFAULT_LOCATION = locations.work as Location;

export const useLocationStore = create<LocationState>()(
  immer((set) => ({
    activeLocation: DEFAULT_LOCATION,
    setActiveLocation: (location) => {
      set((state) => {
        state.activeLocation = location;
      });
    },
    resetActiveLocation: () => {
      set((state) => {
        state.activeLocation = DEFAULT_LOCATION;
      });
    },
  }))
);

export default useLocationStore;
