import create from "zustand";

const UseIsLobbyStore = create((set) => ({
  isLobby: true,
  setIsLobby: (isLobby) => set({ isLobby }),
}));

export default UseIsLobbyStore;
