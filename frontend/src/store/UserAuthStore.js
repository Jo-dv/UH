import create from 'zustand';

const useStore = create(set=> ({
    user: { userSeq: null, userNickname: null, userPassword: null },
    setUser: user => set({ user })
}));

export default useStore;