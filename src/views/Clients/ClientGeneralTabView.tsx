import React from 'react';

// Containers
import { ClientGeneralTabContainer } from '../../containers';

// Components
import { ContainerComponent } from '../../components/';

const ClientGeneralTabView = () => (
  <ContainerComponent withoutSafeAreView>
    <ClientGeneralTabContainer />
  </ContainerComponent>
);

export default ClientGeneralTabView;
