import { creatNewCompany, getAllCompanys } from '@/utils/api/company';
import { create } from 'zustand';

interface Cashear {
  id: number;
  name: string;
  surname: string;
  login: string;
  gender: string;
  date_of_birth: string;
}

interface CashearStore {
  cashears: Cashear[];
  getCashears: (cashears: Cashear[]) => void;
  addCashear: (cashear: Cashear) => Promise<Cashear>;
}

export const useCashaerStore = create<CashearStore>((set) => ({
  cashears: [],
  getCashears: async () => {
    const cashears = await getAllCompanys();
    set(() => ({ cashears }));
  },
  addCashear: async (cashear: Cashear) => {
    const newCashear = await creatNewCompany(cashear);
    set((state) => ({ cashears: [...state.cashears, newCashear] }));
    return newCashear;
  },
}));
