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
import { advancementMock } from '../../mocks';

enum ActionTypes {
  SET_ADVANCEMENT_DRAFT = 'SET_ADVANCEMENT_DRAFT',
  SET_ADVANCEMENTS = 'SET_ADVANCEMENTS',
}

export interface CLIENT_FK extends FK {
  document: string;
  alias: string;
}

export interface AdvancementToSend {
  id?: number;
  _user?: number;
  _credit?: number;
  _advancement_type: string;
  amount: number;
  details: string;
}

export interface Advancement {
  id?: number;
  user?: FK;
  _client?: CLIENT_FK;
  _credit?: FK;
  _advancement_type: string;
  code?: string;
  amount: number;
  details: string;
  disabled?: boolean;
  created_at?: string;
}

interface AdvancementProps {
  advancementDraft: Advancement;
  advancements: Advancement[];
}

type Action = {
  type: ActionTypes.SET_ADVANCEMENT_DRAFT | ActionTypes.SET_ADVANCEMENTS;
  value: Advancement | Advancement[];
};

interface Props {
  children: JSX.Element;
}

const defaultValues: AdvancementProps = {
  advancementDraft: advancementMock,
  advancements: [],
};

const StateContext: Context<AdvancementProps> = createContext(defaultValues);
const DispatchContext: Dispatch<Action> | any = createContext(undefined);

const reducer = (state: AdvancementProps = defaultValues, action: Action) => {
  switch (action.type) {
    case ActionTypes.SET_ADVANCEMENT_DRAFT: {
      const newState: AdvancementProps = {
        ...state,
        advancementDraft: action.value as Advancement,
      };
      return newState;
    }

    case ActionTypes.SET_ADVANCEMENTS: {
      const newState: AdvancementProps = {
        ...state,
        advancements: action.value as Advancement[],
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
