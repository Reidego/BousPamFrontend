import { creatNewTerminal, getAllTerminals } from '@/utils/api/terminal';
import { create } from 'zustand';

interface Terminal {
  id?: number;
  terminalId?: string;
  fare: number;
  company?: string;
  terminal_id?: string;
  company_name?: string;
}

interface terminalsStore {
  terminals: Terminal[];
  getTerminals: () => void;
  addTerminal: (terminal: Terminal) => Promise<Terminal>;
}
export const useTerminalStore = create<terminalsStore>((set) => ({
  terminals: [],
  getTerminals: async () => {
    const terminals = await getAllTerminals();
    set(() => ({
      terminals: terminals.map((terminal: Terminal) => {
        return {
          ...terminal,
          terminalId: terminal.terminal_id,
        };
      }),
    }));
  },
  addTerminal: async (terminal: Terminal) => {
    const newTerminal = await creatNewTerminal(terminal);
    set((state) => ({ terminals: [...state.terminals, newTerminal] }));
    return newTerminal;
  },
}));
