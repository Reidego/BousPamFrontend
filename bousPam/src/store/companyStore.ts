import { creatNewCompany, getAllCompanys } from '@/utils/api/company';
import { create } from 'zustand';

interface Company {
  id?: number;
  name: string;
  owner?: string;
  owner_name?: string;
  owner_surname?: string;
}

interface CompanyStore {
  companys: Company[];
  getCompanys: () => Promise<Company[]>;
  addCompany: (terminal: Company) => Promise<Company>;
}

export const useCompamyStore = create<CompanyStore>((set) => ({
  companys: [],
  getCompanys: async () => {
    const companys = await getAllCompanys();
    set(() => ({ companys }));
    return companys;
  },
  addCompany: async (company: Company) => {
    if (company.owner_name && company.owner_surname) {
      const newCompany = await creatNewCompany(company);
      set((state) => ({ companys: [...state.companys, newCompany] }));
      return newCompany;
    }
  },
}));
