import { create } from "zustand";

const UseRoomStore = create((set) => ({
  rooms: [],
  setRooms: (rooms) => set({ rooms }),
}));

export default UseRoomStore;
