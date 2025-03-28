import { creatNewTerminal, getAllTerminals } from '@/utils/api/terminal';
import { create } from 'zustand';

interface Terminal {
  id: number;
  terminalId: string;
  fare: string;
  company: string;
}

interface terminalsStore {
  terminals: Terminal[];
  getTerminals: (terminals: Terminal[]) => void;
  addTerminal: (terminal: Terminal) => Promise<Terminal>;
}

export const useStore = create<terminalsStore>((set) => ({
  terminals: [],
  getTerminals: async () => {
    const terminals = await getAllTerminals();
    set(() => ({ terminals }));
  },
  addTerminal: async (terminal: Terminal) => {
    const newTerminal = await creatNewTerminal(terminal);
    set((state) => ({ terminals: [...state.terminals, newTerminal] }));
    return newTerminal;
  },
}));
