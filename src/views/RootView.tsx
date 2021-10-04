import React from 'react';

// Views
import { AppView } from './';

// Context
import { SessionContext } from '../context/';

const RootView = () => {
  return (
    <SessionContext.Provider>
      <AppView />
    </SessionContext.Provider>
  );
};

export default RootView;
