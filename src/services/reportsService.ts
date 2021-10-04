import { useMutation } from 'react-query';

// Services
import { api } from './config';

const route = 'reports';

export interface RouteBalanceData {
  office: number;
  route: number;
}

export interface RouteDayBalanceData {
  office: number;
  route: number;
  startDate: string;
  endDate: string;
}

const routeBalance = (data: RouteBalanceData) =>
  api.post(`/routeBalance`, data);

const routeDayBalance = (data: RouteDayBalanceData) =>
  api.post(`/routeDayBalance`, data);

const routeIncomesExpenses = (data: RouteDayBalanceData) =>
  api.post(`/routeIncomesExpenses`, data);

const adviserDayMovements = () => api.get(`/adviserDayMovements`);

const useRouteBalance = () =>
  useMutation((data: RouteBalanceData) => routeBalance(data));

const useRouteDayBalance = () =>
  useMutation((data: RouteDayBalanceData) => routeDayBalance(data));

const useRouteIncomesExpenses = () =>
  useMutation((data: RouteDayBalanceData) => routeIncomesExpenses(data));

const useAdviserDayMovements = () => useMutation(() => adviserDayMovements());

export {
  useRouteBalance,
  useRouteDayBalance,
  useRouteIncomesExpenses,
  useAdviserDayMovements,
};
