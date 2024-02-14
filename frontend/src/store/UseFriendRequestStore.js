import { create } from "zustand";

const UseFriendRequestStore = create((set) => ({
  requestList: [],
  setRequestList: (requestList) => set({ requestList }),
}));

export default UseFriendRequestStore;
