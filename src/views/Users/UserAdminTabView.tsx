import React from 'react';

// Containers
import { UserAdminTabContainer } from '../../containers/';

// Components
import { ContainerComponent } from '../../components/';

const UserAdminTabView = () => (
  <ContainerComponent withoutSafeAreView>
    <UserAdminTabContainer />
  </ContainerComponent>
);

export default UserAdminTabView;
