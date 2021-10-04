import React from 'react';

// Assets
import { Colors } from '../../assets';

import { RolesContainer } from '../../containers/';

// Components
import {
  CustomHeaderComponent as Header,
  ContainerComponent,
} from '../../components';

const RolesView = (props: any) => {
  const {
    navigation,
    route: { name },
  } = props;

  const onRightIconPress = () => navigation.openDrawer();

  return (
    <ContainerComponent>
      <>
        <Header
          rightIconType="ionicon"
          rightIconColor={Colors.white}
          rightIconName="ios-menu"
          rightIconPress={onRightIconPress}
          title={name}
        />
        <RolesContainer />
      </>
    </ContainerComponent>
  );
};

export default RolesView;
