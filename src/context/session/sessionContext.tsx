import React, {
  Context,
  useReducer,
  useContext,
  Dispatch,
  createContext,
  FC,
} from 'react';

// constants
import { ERRORS } from '../../constants/';

// Mocks
import { userMock } from '../../mocks/';

enum ActionTypes {
  SET_USER = 'SET_USER',
  SET_USER_DRAFT = 'SET_USER_DRAFT',
  SET_NEW_USER_DRAFT = 'SET_NEW_USER_DRAFT',
  SET_USERS = 'SET_USERS',
  SET_IS_LOADING = 'SET_IS_LOADING',
  SET_IS_AUTHENTICATED = 'SET_IS_AUTHENTICATED',
  SET_AUTH_TOKEN = 'SET_AUTH_TOKEN',
  LOGOUT = 'LOGOUT',
}

export interface FK {
  id: number;
  name: string;
  last_name?: string;
}

export interface UserToSend {
  id?: number;
  _user?: number;
  document_type?: FK;
  document: string;
  name: string;
  last_name: string;
  city?: FK;
  address: string;
  office?: FK;
  route?: FK;
  rol: FK;
  password: string;
  phone_number: string;
}

export interface User {
  id?: number;
  user?: FK;
  document_type?: FK;
  document: string;
  name: string;
  last_name: string;
  city?: FK;
  address: string;
  office?: FK;
  route?: FK;
  rol: FK;
  password: string;
  phone_number: string;
  disabled?: boolean;
  created_at?: string;
  can_create_special_credits?: boolean;
  minCreditValue?: number;
  maxCreditValue?: number;
}

interface Session {
  user: User;
  userDraft: User;
  users: User[];
  isLoading: boolean;
  isAuthenticated: boolean;
  authToken: string;
  refreshToken: string;
}

type Action = {
  type:
    | ActionTypes.SET_USER
    | ActionTypes.SET_USER_DRAFT
    | ActionTypes.SET_NEW_USER_DRAFT
    | ActionTypes.SET_USERS
    | ActionTypes.SET_IS_LOADING
    | ActionTypes.SET_IS_AUTHENTICATED
    | ActionTypes.SET_AUTH_TOKEN
    | ActionTypes.LOGOUT;
  value: User | User[] | boolean | string | Session;
};

interface Props {
  children: JSX.Element;
}

const defaultValues: Session = {
  user: userMock,
  userDraft: userMock,
  users: [],
  isLoading: false,
  isAuthenticated: false,
  authToken: '',
  refreshToken: '',
};

const StateContext: Context<Session> = createContext(defaultValues);
const DispatchContext: Dispatch<Action> | any = createContext(undefined);

const reducer = (state: Session = defaultValues, action: Action) => { 

  // console.log( action );

  switch (action.type) {
    case ActionTypes.SET_USER: {
      const newState: Session = {
        ...state,
        user: action.value as User,
      };
      return newState;
    }

    case ActionTypes.SET_USER_DRAFT: {
      const newState: Session = {
        ...state,
        userDraft: {
          ...state.userDraft,
          ...(action.value as User),
        },
      };
      return newState;
    }

    case ActionTypes.SET_NEW_USER_DRAFT: {
      const newState: Session = {
        ...state,
        userDraft: action.value as User,
      };
      return newState;
    }

    case ActionTypes.SET_USERS: {
      const newState: Session = {
        ...state,
        users: action.value as User[],
      };
      return newState;
    }

    case ActionTypes.SET_AUTH_TOKEN: {
      const newState: Session = {
        ...state,
        authToken: action.value as string,
      };
      return newState;
    }

    case ActionTypes.SET_IS_LOADING: {
      const newState: Session = {
        ...state,
        isLoading: action.value as boolean,
      };
      return newState;
    }

    case ActionTypes.SET_IS_AUTHENTICATED: {
      const newState: Session = {
        ...state,
        isAuthenticated: action.value as boolean,
      };
      return newState;
    }

    case ActionTypes.LOGOUT: {
      return defaultValues;
    }

    default: {
      throw new Error(`No se puede llamar la acción: ${action.type}`);
    }
  }
};

const Provider: FC<Props> = ({ children }) => {  

  const [state, dispatch] = useReducer(reducer, defaultValues);
  // TODO: Uncomment code when you need to persist the session
  /* const [logoutMutate] = useLogout();

  useEffect(() => {
    const fetchData = async () => {
      dispatch({
        type: ActionTypes.SET_IS_LOADING,
        value: true,
      });
      const authToken = await AsyncStorage.getItem(STORAGE_TOKEN_KEY);

      if (authToken && !state.isAuthenticated) {
        dispatch({
          type: ActionTypes.SET_AUTH_TOKEN,
          value: authToken,
        });
        dispatch({
          type: ActionTypes.SET_IS_AUTHENTICATED,
          value: true,
        });

        try {
          const rs: any = await AsyncStorage.getItem(STORAGE_USER_KEY);
          const authUser = JSON.parse(rs);

          if (isEmpty(authUser)) {
            await logoutMutate();
            dispatch({ type: ActionTypes.LOGOUT, value: '' });
          } else {
            setToken(authToken);
            dispatch({ type: ActionTypes.SET_USER, value: authUser });
          }
        } catch (err) {
          await logoutMutate();
          dispatch({ type: ActionTypes.LOGOUT, value: '' });
        }
      }

      dispatch({
        type: ActionTypes.SET_IS_LOADING,
        value: false,
      });
    };

    fetchData();
  }, [state.isAuthenticated, logoutMutate]); */

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
