import { create } from "zustand";

const UseRoomSetting = create((set) => ({
  roomSetting: false,
  setRoomSetting: (roomSetting) => set({ roomSetting }),
}));

export default UseRoomSetting;
