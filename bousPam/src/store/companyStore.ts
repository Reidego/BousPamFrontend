import { creatNewCompany, getAllCompanys } from '@/utils/api/company';
import { create } from 'zustand';

interface Company {
  id: number;
  name: string;
  owner: string;
}

interface CompanyStore {
  companys: Company[];
  getCompanys: (terminals: Company[]) => void;
  addCompany: (terminal: Company) => Promise<Company>;
}

export const useStore = create<CompanyStore>((set) => ({
  companys: [],
  getCompanys: async () => {
    const companys = await getAllCompanys();
    set(() => ({ companys }));
  },
  addCompany: async (company: Company) => {
    const newCompany = await creatNewCompany(company);
    set((state) => ({ companys: [...state.companys, newCompany] }));
    return newCompany;
  },
}));
