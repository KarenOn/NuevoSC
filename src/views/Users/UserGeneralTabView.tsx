import React from 'react';

// Containers
import { UserGeneralTabContainer } from '../../containers';

// Components
import { ContainerComponent } from '../../components/';

const UserGeneralTabView = () => (
  <ContainerComponent withoutSafeAreView>
    <UserGeneralTabContainer />
  </ContainerComponent>
);

export default UserGeneralTabView;
