import React from 'react';

// Assets
import { Colors } from '../../assets/';

import { RouteDayBalanceReportContainer } from '../../containers/';

// Components
import {
  CustomHeaderComponent as Header,
  ContainerComponent,
} from '../../components/';
import { ROUTES } from '../../constants';

// Context
import { OfficeContext, RouteContext } from '../../context';

const RouteBalanceReportView = (props: any) => {
  const { navigation } = props;

  const onRightIconPress = () => navigation.openDrawer();

  return (
    <OfficeContext.Provider>
      <RouteContext.Provider>
        <ContainerComponent>
          <>
            <Header
              rightIconType="ionicon"
              rightIconColor={Colors.white}
              rightIconName="ios-menu"
              rightIconPress={onRightIconPress}
              title={ROUTES.ROUTE_CUADRE_ROUTE}
            />
            <RouteDayBalanceReportContainer />
          </>
        </ContainerComponent>
      </RouteContext.Provider>
    </OfficeContext.Provider>
  );
};

export default RouteBalanceReportView;
