import { create } from "zustand";

const UseIsMusicPlay = create((set) => ({
  isMusicPlay: true,
  setIsMusicPlay: (isMusicPlay) => set({ isMusicPlay }),
}));

export default UseIsMusicPlay;
