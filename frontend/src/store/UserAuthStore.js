import create from 'zustand';
import { persist } from 'zustand/middleware'

const useStore = create(
    persist(
        set => ({
          user: { userSeq: null, userNickname: null, userPassword: null },
          setUser: user => set({ user }),
          // 유저 정보 초기화 함수를 여기에 추가
            resetUser: () => set({ user: { userSeq: null, userNickname: null, userPassword: null } })
        }),
        {
          name: 'user-storage', // 로컬 스토리지에 저장될 때 사용할 키
          getStorage: () => localStorage // 여기를 localStorage로 변경
        }
      )
);

export default useStore;