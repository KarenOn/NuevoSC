import React from 'react';

// Assets
import { Colors } from '../../assets';

import { CitiesContainer } from '../../containers/';

// Components
import {
  CustomHeaderComponent as Header,
  ContainerComponent,
} from '../../components';

const CitiesView = (props: any) => {
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
        <CitiesContainer />
      </>
    </ContainerComponent>
  );
};

export default CitiesView;
