import React from 'react';

// Containers
import { GeneralTabContainer } from '../../containers';

// Components
import { ContainerComponent } from '../../components/';

const CreateGeneralTabView = () => (
  <ContainerComponent withoutSafeAreView>
    <GeneralTabContainer />
  </ContainerComponent>
);

export default CreateGeneralTabView;
