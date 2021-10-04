import React from 'react';
import { Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Components
import { GeneralTabComponent } from '../../components';

// Context
import { OfficeContext } from '../../context/';

// Constants
import { ROUTES } from '../../constants/';

const GeneralTabContainer: React.FC = () => {
  const { officeDraft } = OfficeContext.useState();
  const officeDispatch = OfficeContext.useDispatch();
  const navigation = useNavigation();

  const submitFunction = (values: OfficeContext.OfficeToSend) => {
    Keyboard.dismiss();
    officeDispatch({
      type: OfficeContext.ActionTypes.SET_OFFICE_DRAFT,
      value: values,
    });
    navigation.navigate(ROUTES.OFFICE_CREDITS_TAB_ROUTE);
  };

  return (
    <GeneralTabComponent
      defaultValues={officeDraft}
      status={'idle'}
      error={null}
      submitFunction={submitFunction}
    />
  );
};

export default GeneralTabContainer;
