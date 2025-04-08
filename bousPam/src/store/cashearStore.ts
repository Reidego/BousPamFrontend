import { creatNewCashier, getAllCashiers } from '@/utils/api/users';
import { create } from 'zustand';

interface Cashear {
  id?: number;
  name: string;
  surname: string;
  login: string;
  password: string;
  phone_number: string;
  gender: string;
  date_of_birth: string;
}

interface CashearStore {
  cashears: Cashear[];
  getCashears: () => Promise<Cashear[]>;
  addCashear: (cashear: Cashear) => Promise<Cashear>;
}

export const useCashaerStore = create<CashearStore>((set) => ({
  cashears: [],
  getCashears: async () => {
    const cashears = await getAllCashiers();
    set(() => ({ cashears }));
    return cashears;
  },
  addCashear: async (cashear: Cashear) => {
    const newCashear = await creatNewCashier(cashear);
    set((state) => ({ cashears: [...state.cashears, newCashear] }));
    return newCashear;
  },
}));
