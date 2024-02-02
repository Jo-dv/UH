import { create } from "zustand";

const UseAccessorsStore = create((set) => ({
  accessors: [],
  setAccessors: (accessors) => set({ accessors }),
}));

export default UseAccessorsStore;
