import { create } from "zustand";

const UseFriendsStore = create((set) => ({
  friends: [],
  setFriends: (friends) => set({ friends }),
}));

export default UseFriendsStore;
