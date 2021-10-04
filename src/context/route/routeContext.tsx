import React, {
  Context,
  useReducer,
  useContext,
  Dispatch,
  createContext,
  FC,
} from 'react';

// Constants
import { ERRORS } from '../../constants/';

// Mocks
import { routeMock } from '../../mocks/';

// Context
import { FK } from '../session/sessionContext';

enum ActionTypes {
  SET_ROUTES = 'SET_ROUTES',
  SET_ROUTE_DRAFT = 'SET_ROUTE_DRAFT',
}

export interface Route {
  id?: number;
  user?: FK;
  adviser?: FK;
  city?: FK;
  office?: FK;
  name: string;
  partners: string;
  phone_number: string;
  permitir_abonos: boolean;
  can_create_client: boolean;
  balance: number;
  disabled?: boolean;
  created_at?: string;
}

export interface RouteToSend {
  id?: number;
  _user?: number;
  _city?: number;
  _office?: number;
  name: string;
  partners: string;
  phone_number: string;
  permitir_abonos: boolean;
  can_create_client: boolean;
}

interface RouteProps {
  routeDraft: Route;
  routes: Route[];
}

type Action = {
  type: ActionTypes.SET_ROUTES | ActionTypes.SET_ROUTE_DRAFT;
  value: Route[] | Route;
};

interface Props {
  children: JSX.Element;
}

const defaultValues: RouteProps = {
  routeDraft: routeMock,
  routes: [],
};

const StateContext: Context<RouteProps> = createContext(defaultValues);
const DispatchContext: Dispatch<Action> | any = createContext(undefined);

const reducer = (state: RouteProps = defaultValues, action: Action) => {
  switch (action.type) {
    case ActionTypes.SET_ROUTES: {
      const newState: RouteProps = {
        ...state,
        routes: action.value as Route[],
      };

      return newState;
    }

    case ActionTypes.SET_ROUTE_DRAFT: {
      const newState: RouteProps = {
        ...state,
        routeDraft: action.value as Route,
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
