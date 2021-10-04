import { IncomeExpense } from '../context/incomeExpense/incomeExpenseContext';

export const incomeExpenseMock: IncomeExpense = {
  income_expense_type: {
    id: 0,
    name: '',
  },
  income_expense_category: {
    id: 0,
    name: '',
  },
  income_expense_concept: {
    id: 0,
    name: '',
  },
  office: {
    id: 0,
    name: '',
  },
  route: {
    id: 0,
    name: '',
  },
  observation: '',
  amount: 0,
  office_of_route: '',
};

export const incomeExpensesMock: IncomeExpense[] = [];
