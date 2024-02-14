import { create } from "zustand";

const UseIsMusicPlay = create((set) => ({
  isPlaying: true,
  play: () => set({ isPlaying: true }),
  pause: () => set({ isPlaying: false }),
}));

export default UseIsMusicPlay;
