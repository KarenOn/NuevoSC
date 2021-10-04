import React from 'react';

// Assets
import { Colors } from '../../assets/';

import { RouteIncomesExpensesReportContainer } from '../../containers/';

// Components
import {
  CustomHeaderComponent as Header,
  ContainerComponent,
} from '../../components/';
import { ROUTES } from '../../constants';

// Context
import { OfficeContext, RouteContext } from '../../context';

const RouteIncomesExpensesView = (props: any) => {
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
              title={ROUTES.ROUTE_INCOME_EXPENSE_ROUTE}
            />
            <RouteIncomesExpensesReportContainer />
          </>
        </ContainerComponent>
      </RouteContext.Provider>
    </OfficeContext.Provider>
  );
};

export default RouteIncomesExpensesView;
