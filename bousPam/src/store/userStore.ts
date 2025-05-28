import { create } from 'zustand';
import getUserByLogin from '../utils/api/login';

interface StoreState {
  isAuth: boolean;
  role: string;
  user: {
    name: string;
    phoneNmber: string;
    gender: string;
    role: string;
    birthdey: string;
  };
  getUser: (login: string, password: string) => Promise<void>;
  setIsAuth: (auth: boolean) => void;
}

export const useUserStore = create<StoreState>((set) => ({
  isAuth: false,
  role: '',
  user: {
    name: '',
    phoneNmber: '',
    gender: '',
    role: '',
    birthdey: '',
  },
  getUser: async (login: string, password: string) => {
    const user = await getUserByLogin({ login, password });
    console.log('user', user);
    if (user?.name) {
      if (user?.role) {
        set(() => ({ role: user.role }));
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
      return user;
    }
  },
  setIsAuth: (auth: boolean) => set(() => ({ isAuth: auth })),
}));
