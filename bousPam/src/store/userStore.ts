import { create } from 'zustand';
import getUserByLogin from '../utils/api/login';
import { getAllTerminals, creatNewTerminal } from '@/utils/api/terminal';

interface User {
  name: string;
  phoneNmber: string;
  gender: string;
  role: string;
  birthdey: string;
}

interface StoreState {
  isAuth: boolean;
  isAdmin: boolean;
  user: User;

  setIsAuth: (auth: boolean) => void;
}

export const useUserStore = create<StoreState>((set) => ({
  isAuth: false,
  isAdmin: false,
  user: {
    name: '',
    phoneNmber: '',
    gender: '',
    role: '',
    birthdey: '',
  },
  getUser: async (login: string, password: string) => {
    const user = await getUserByLogin({ login, password });
    if (user?.name) {
      if (user?.role === 'admin') {
        set(() => ({ isAuth: true }));
      }
      set(() => ({ isAuth: true }));
      set(() => ({ user: JSON.parse(user) }));
    }
  },
  setIsAuth: (auth: boolean) => set(() => ({ isAuth: auth })),
}));
