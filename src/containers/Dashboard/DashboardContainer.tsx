import React from 'react';

// Components
import { DashboardComponent } from '../../components/';

// Context
import { SessionContext } from '../../context';

const DashboardContainer: React.FC = () => {
  const { user } = SessionContext.useState();

  return <DashboardComponent user={user} />;
};

export default DashboardContainer;
