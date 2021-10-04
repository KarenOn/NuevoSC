import React from 'react';

// Assets
import { Colors } from '../../assets/';

// Containers
import { DashboardContainer } from '../../containers/';

// Components
import {
  CustomHeaderComponent as Header,
  ContainerComponent,
} from '../../components/';

const DashboardView = (props: any) => {
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
        <DashboardContainer />
      </>
    </ContainerComponent>
  );
};

export default DashboardView;
