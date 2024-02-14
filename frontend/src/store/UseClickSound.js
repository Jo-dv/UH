import { create } from "zustand";

const UseClickSound = create((set) => ({
  isSoundPlaying: false,
  playSound: () => set({ isSoundPlaying: true }),
  stopSound: () => set({ isSoundPlaying: false }),
}));

export default UseClickSound;
