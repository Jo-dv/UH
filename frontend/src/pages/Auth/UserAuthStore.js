import create from 'zustand';

const useStore = create(set=> ({
    userNickname: '',
    userSeq: '',
    setNickname: (nickname) => set({userNickname: nickname}),
    setSeq: (seq) => set({userSeq: seq}),
}));

export default useStore;