import { create } from 'zustand';
import getUserByLogin from '../utils/api/login';

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
  isAuth: true,
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
        set(() => ({ isAdmin: true }));
      }
      set(() => ({ isAuth: true }));
      set(() => ({
        user: {
          name: `${user.name} ${user.surname}`,
          phoneNmber: user.phone_number,
          gender: user.gender,
          role: user.role,
          birthdey: user.date_of_birth,
        },
      }));
    }
  },
  setIsAuth: (auth: boolean) => set(() => ({ isAuth: auth })),
}));
