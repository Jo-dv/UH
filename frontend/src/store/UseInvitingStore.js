import { create } from "zustand";

const UseInvitingStore = create((set) => ({
  inviting: false,
  setInviting: (inviting) => set({ inviting }),
}));

export default UseInvitingStore;
