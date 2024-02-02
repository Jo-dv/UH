import { create } from "zustand";

const UseLeavingStore = create((set) => ({
  leaving: false,
  setLeaving: (leaving) => set({ leaving }),
}));

export default UseLeavingStore;
