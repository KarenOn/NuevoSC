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
import { documentTypeMock } from '../../mocks/';

// Context
import { FK } from '../session/sessionContext';

enum ActionTypes {
  SET_DOCUMENT_TYPES = 'SET_DOCUMENT_TYPES',
  SET_DOCUMENT_TYPE_DRAFT = 'SET_DOCUMENT_TYPE_DRAFT',
}

export interface DocumentType {
  id?: number;
  name: string;
  created_at?: string;
  user?: FK;
}

interface DocumentTypeProps {
  documentTypeDraft: DocumentType;
  documentTypes: DocumentType[];
}

type Action = {
  type: ActionTypes.SET_DOCUMENT_TYPES | ActionTypes.SET_DOCUMENT_TYPE_DRAFT;
  value: DocumentType[] | DocumentType;
};

interface Props {
  children: JSX.Element;
}

const defaultValues: DocumentTypeProps = {
  documentTypeDraft: documentTypeMock,
  documentTypes: [],
};

const StateContext: Context<DocumentTypeProps> = createContext(defaultValues);
const DispatchContext: Dispatch<Action> | any = createContext(undefined);

const reducer = (state: DocumentTypeProps = defaultValues, action: Action) => {
  switch (action.type) {
    case ActionTypes.SET_DOCUMENT_TYPES: {
      const newState: DocumentTypeProps = {
        ...state,
        documentTypes: action.value as DocumentType[],
      };

      return newState;
    }

    case ActionTypes.SET_DOCUMENT_TYPE_DRAFT: {
      const newState: DocumentTypeProps = {
        ...state,
        documentTypeDraft: action.value as DocumentType,
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
