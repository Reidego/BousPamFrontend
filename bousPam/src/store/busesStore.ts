import { getAllBuses, creatNewBus } from '@/utils/api/buses';
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
  number: string;
  company_name: string;
  id: number;
}

interface CashearStore {
  buses: Bus[];
  getAllBuses: () => Promise<Bus[]>;
  addBus: (bus: { number: string; companyName: string }) => Promise<Bus>;
}

export const useBusesStore = create<CashearStore>((set) => ({
  buses: [],
  getAllBuses: async () => {
    const buses = await getAllBuses();
    set(() => ({ buses }));
    return buses;
  },
  addBus: async (bus: { number: string; companyName: string }) => {
    const newBus = await creatNewBus(bus);
    set((state) => ({ buses: [...state.buses, newBus] }));
    return newBus;
  },
}));
