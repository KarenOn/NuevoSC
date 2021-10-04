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
  SET_INCOME_EXPENSE_TYPES = 'SET_INCOME_EXPENSE_TYPES',
}

export interface IncomeExpenseType {
  id: number;
  name: string;
}

interface IncomeExpenseTypeProps {
  incomeExpenseTypes: IncomeExpenseType[];
}

type Action = {
  type: ActionTypes.SET_INCOME_EXPENSE_TYPES;
  value: IncomeExpenseType[];
};

interface Props {
  children: JSX.Element;
}

const defaultValues: IncomeExpenseTypeProps = {
  incomeExpenseTypes: [],
};

const StateContext: Context<IncomeExpenseTypeProps> = createContext(
  defaultValues,
);
const DispatchContext: Dispatch<Action> | any = createContext(undefined);

const reducer = (
  state: IncomeExpenseTypeProps = defaultValues,
  action: Action,
) => {
  switch (action.type) {
    case ActionTypes.SET_INCOME_EXPENSE_TYPES: {
      const newState: IncomeExpenseTypeProps = {
        ...state,
        incomeExpenseTypes: action.value as IncomeExpenseType[],
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
