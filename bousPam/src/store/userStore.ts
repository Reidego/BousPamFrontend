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
  getUser: (login: string, password: string) => Promise<any>;
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
    console.log(login, password);
    if (user?.name) {
      set(() => ({ role: user.role }));
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
    return undefined;
  },
  setIsAuth: (auth: boolean) => set(() => ({ isAuth: auth })),
}));
