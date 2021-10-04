import React, {
  Context,
  useReducer,
  useContext,
  Dispatch,
  createContext,
  FC,
} from 'react';

// constants
import { ERRORS } from '../../constants';

// Context
import { FK } from '../session/sessionContext';

// Mocks
import { incomeExpenseMock } from '../../mocks';

enum ActionTypes {
  SET_INCOME_EXPENSE_DRAFT = 'SET_INCOME_EXPENSE_DRAFT',
  SET_INCOME_EXPENSES = 'SET_INCOME_EXPENSES',
}

export interface IncomeExpenseToSend {
  id?: number;
  _user?: number;
  _income_expense_type: number;
  _income_expense_category: number;
  _income_expense_concept: number;
  _office: number;
  _route?: number;
  observation: string;
  amount: number;
}

export interface IncomeExpense {
  id?: number;
  user?: FK;
  income_expense_type?: FK;
  income_expense_category?: FK;
  income_expense_concept?: FK;
  office?: FK;
  route?: FK;
  code?: string;
  observation: string;
  amount: number;
  office_of_route: string;
  disabled?: boolean;
  created_at?: string;
}

interface IncomeExpenseProps {
  incomeExpenseDraft: IncomeExpense;
  incomeExpenses: IncomeExpense[];
}

type Action = {
  type: ActionTypes.SET_INCOME_EXPENSE_DRAFT | ActionTypes.SET_INCOME_EXPENSES;
  value: IncomeExpense | IncomeExpense[];
};

interface Props {
  children: JSX.Element;
}

const defaultValues: IncomeExpenseProps = {
  incomeExpenseDraft: incomeExpenseMock,
  incomeExpenses: [],
};

const StateContext: Context<IncomeExpenseProps> = createContext(defaultValues);
const DispatchContext: Dispatch<Action> | any = createContext(undefined);

const reducer = (state: IncomeExpenseProps = defaultValues, action: Action) => {
  switch (action.type) {
    case ActionTypes.SET_INCOME_EXPENSE_DRAFT: {
      const newState: IncomeExpenseProps = {
        ...state,
        incomeExpenseDraft: action.value as IncomeExpense,
      };
      return newState;
    }

    case ActionTypes.SET_INCOME_EXPENSES: {
      const newState: IncomeExpenseProps = {
        ...state,
        incomeExpenses: action.value as IncomeExpense[],
      };
      return newState;
    }

    default: {
      throw new Error(`No se puede llamar la acción: ${action.type}`);
    }
  }
};

const Provider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, defaultValues);

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
};

const useState = () => {
  const context = useContext(StateContext);

  if (context === undefined) {
    throw new Error(ERRORS.PROVIDER_STATE_ERROR);
  }

  return context;
};

const useDispatch: any = () => {
  const context = useContext(DispatchContext);

  if (context === undefined) {
    throw new Error(ERRORS.PROVIDER_DISPATCH_ERROR);
  }

  return context;
};

export { Provider, useState, useDispatch, ActionTypes };
