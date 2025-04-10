import { getAllOperations } from '@/utils/api/users';
import { create } from 'zustand';

interface User {
  id: number;
  name: string;
  surname: string;
  phoneNmber: string;
}

interface StoreState {
  user: User;
  getOpeartions: (id: number) => Promise<any[]>;
  setPassengerForOperations: (data: User) => Promise<void>;
}

export const usePassengerStore = create<StoreState>((set) => ({
  user: {
    id: NaN,
    name: '',
    surname: '',
    phoneNmber: '',
  },
  getOpeartions: async (id: number) => {
    return await getAllOperations(id);
  },
  setPassengerForOperations: async (data: User) => {
    set(() => ({
      user: data,
    }));
  },
}));
