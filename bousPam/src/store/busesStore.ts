import { getAllBuses, creatNewBus } from '@/utils/api/users';
import { create } from 'zustand';

interface Cashear {
  id?: number;
  name: string;
  surname: string;
  login: string;
  password: string;
  phone_number: string;
  gender: string;
  role: string;
  date_of_birth: string;
}

interface Bus {
  id?: number;
  name: string;
  surname: string;
  e_mail: string;
  passport_number: string;
  inn: string;
  tg_id?: string;
  balance?: number;
  phone_number: string;
  snils: string;
  card_number?: string;
}

interface CashearStore {
  buses: Bus[];
  getBus: () => Promise<Bus[]>;
  addBus: (bus: Bus) => Promise<Bus>;
}

export const useCashaerStore = create<CashearStore>((set) => ({
  buses: [],
  getBus: async () => {
    const buses = await getAllBuses();
    set(() => ({ buses }));
    return buses;
  },
  addBus: async (bus: Bus) => {
    const newBus = await creatNewBus(bus);
    set((state) => ({ buses: [...state.buses, newBus] }));
    return newBus;
  },
}));
