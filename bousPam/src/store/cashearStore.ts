import {
  creatNewCashier,
  creatNewPassenger,
  getAllCashiers,
  getAllPassengers,
  replenishPassenger,
} from '@/utils/api/users';
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

interface Passengers {
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
  cashears: Cashear[];
  passengers: Passengers[];
  getCashears: () => Promise<Cashear[]>;
  getPassengers: () => Promise<Passengers[]>;
  addPassenger: (passenger: Passengers) => Promise<Passengers>;
  addCashear: (cashear: Cashear) => Promise<Cashear>;

  replenishPassengerBalance: (id: string, amount: number) => Promise<void>;
}

export const useCashaerStore = create<CashearStore>((set) => ({
  cashears: [],
  passengers: [],
  replenishPassengerBalance: async (cardNumber: string, amount: number) => {
    await replenishPassenger(cardNumber, amount);
  },
  getCashears: async () => {
    const cashears = await getAllCashiers();
    set(() => ({ cashears }));
    return cashears;
  },
  getPassengers: async () => {
    const passengers = await getAllPassengers();
    set(() => ({ passengers }));
    return passengers;
  },
  addPassenger: async (passenger: Passengers) => {
    const newPassenger = await creatNewPassenger(passenger);
    set((state) => ({ passengers: [...state.passengers, newPassenger] }));
    return newPassenger;
  },
  addCashear: async (cashear: Cashear) => {
    const newCashear = await creatNewCashier(cashear);
    typeof newCashear !== 'string'
      ? set((state) => ({ cashears: [...state.cashears, cashear] }))
      : undefined;
    return newCashear;
  },
}));
