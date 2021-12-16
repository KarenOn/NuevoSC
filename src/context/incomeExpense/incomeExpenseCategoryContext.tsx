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

enum ActionTypes {
  SET_INCOME_EXPENSE_CATEGORIES = 'SET_INCOME_EXPENSE_CATEGORIES',
}

export interface IncomeExpenseCategory {
  id: number;
  name: string;
  _income_expense_type:number;
}

interface IncomeExpenseCategoryProps {
  incomeExpenseCategories: IncomeExpenseCategory[];
}

type Action = {
  type: ActionTypes.SET_INCOME_EXPENSE_CATEGORIES;
  value: IncomeExpenseCategory[];
};

interface Props {
  children: JSX.Element;
}

const defaultValues: IncomeExpenseCategoryProps = {
  incomeExpenseCategories: [],
};

const StateContext: Context<IncomeExpenseCategoryProps> = createContext(
  defaultValues,
);
const DispatchContext: Dispatch<Action> | any = createContext(undefined);

const reducer = (
  state: IncomeExpenseCategoryProps = defaultValues,
  action: Action,
) => {
  switch (action.type) {
    case ActionTypes.SET_INCOME_EXPENSE_CATEGORIES: {
      const newState: IncomeExpenseCategoryProps = {
        ...state,
        incomeExpenseCategories: action.value as IncomeExpenseCategory[],
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
