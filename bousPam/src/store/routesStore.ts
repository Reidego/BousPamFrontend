import { creatNewRoute, getAllRoutes } from '@/utils/api/routes';

import { create } from 'zustand';

// interface Cashear {
//   id?: number;
//   name: string;
//   surname: string;
//   login: string;
//   password: string;
//   phone_number: string;
//   gender: string;
//   role: string;
//   date_of_birth: string;
// }

interface route {
  transport_company: string;
  name: string;
  stops: string[];
  terminal_id: number;
  bus_number: string;
}

interface CashearStore {
  routes: route[];
  getRoutes: () => Promise<route[]>;
  addRoute: (route: route) => Promise<route>;
}

export const useRouteStore = create<CashearStore>((set) => ({
  routes: [],
  getRoutes: async () => {
    const routes = await getAllRoutes();
    set(() => ({ routes }));
    return routes;
  },
  addRoute: async (route: route) => {
    const newRoute = await creatNewRoute(route);

    if (typeof newRoute !== 'string')
      set((state) => ({ routes: [...state.routes, route] }));

    return newRoute;
  },
}));
