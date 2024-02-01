import create from "zustand";

const UseIsLobbyStore = create((set) => ({
  isLobby: null,
  setIsLobby: (isLobby) => set({ isLobby }),
}));

export default UseIsLobbyStore;
