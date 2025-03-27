import { create } from 'zustand';

const useStore = create((set) => ({
  isAuth: false,
  setAuthTrue: () => set(() => ({ isAuth: true })),
  setAuthFalse: () => set(() => ({ isAuth: false })),
  // user: null,
  // password: null,

  // setUser: (user: string) => set(() => ({ user: user })),
  // setPassword: (password: string) => set(() => ({ password: password })),
}));

export default useStore;
