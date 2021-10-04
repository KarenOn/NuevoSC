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
  SET_INCOME_EXPENSE_CONCEPTS = 'SET_INCOME_EXPENSE_CONCEPTS',
}

export interface IncomeExpenseConcept {
  id: number;
  name: string;
}

interface IncomeExpenseConceptProps {
  incomeExpenseConcepts: IncomeExpenseConcept[];
}

type Action = {
  type: ActionTypes.SET_INCOME_EXPENSE_CONCEPTS;
  value: IncomeExpenseConcept[];
};

interface Props {
  children: JSX.Element;
}

const defaultValues: IncomeExpenseConceptProps = {
  incomeExpenseConcepts: [],
};

const StateContext: Context<IncomeExpenseConceptProps> = createContext(
  defaultValues,
);
const DispatchContext: Dispatch<Action> | any = createContext(undefined);

const reducer = (
  state: IncomeExpenseConceptProps = defaultValues,
  action: Action,
) => {
  switch (action.type) {
    case ActionTypes.SET_INCOME_EXPENSE_CONCEPTS: {
      const newState: IncomeExpenseConceptProps = {
        ...state,
        incomeExpenseConcepts: action.value as IncomeExpenseConcept[],
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
