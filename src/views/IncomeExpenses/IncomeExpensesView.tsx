import React from 'react';

// Assets
import { Colors } from '../../assets/';

import { IncomeExpensesContainer } from '../../containers/';

// Components
import {
  CustomHeaderComponent as Header,
  ContainerComponent,
} from '../../components/';
import { TextConstants } from '../../constants';

const IncomeExpensesView = (props: any) => {
  const { navigation } = props;

  const onRightIconPress = () => navigation.openDrawer();

  return (
    <ContainerComponent>
      <>
        <Header
          rightIconType="ionicon"
          rightIconColor={Colors.white}
          rightIconName="ios-menu"
          rightIconPress={onRightIconPress}
          title={TextConstants.INCOME_EXPENSES_TITLE}
        />
        <IncomeExpensesContainer />
      </>
    </ContainerComponent>
  );
};

export default IncomeExpensesView;
