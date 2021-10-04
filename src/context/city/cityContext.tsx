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
import { cityMock } from '../../mocks/';

// Context
import { FK } from '../session/sessionContext';

enum ActionTypes {
  SET_CITIES = 'SET_CITIES',
  SET_CITY_DRAFT = 'SET_CITY_DRAFT',
}

export interface City {
  id?: number;
  user?: FK;
  name: string;
  created_at?: string;
}

interface CityProps {
  cityDraft: City;
  cities: City[];
}

type Action = {
  type: ActionTypes.SET_CITIES | ActionTypes.SET_CITY_DRAFT;
  value: City[] | City;
};

interface Props {
  children: JSX.Element;
}

const defaultValues: CityProps = {
  cityDraft: cityMock,
  cities: [],
};

const StateContext: Context<CityProps> = createContext(defaultValues);
const DispatchContext: Dispatch<Action> | any = createContext(undefined);

const reducer = (state: CityProps = defaultValues, action: Action) => {
  switch (action.type) {
    case ActionTypes.SET_CITIES: {
      const newState: CityProps = {
        ...state,
        cities: action.value as City[],
      };

      return newState;
    }

    case ActionTypes.SET_CITY_DRAFT: {
      const newState: CityProps = {
        ...state,
        cityDraft: action.value as City,
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
