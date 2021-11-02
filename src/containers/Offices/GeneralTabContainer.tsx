import React from 'react';
import { Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NotificationComponent } from '../../components/common';
import {validationAccess} from '../../utils'
import message from '../../utils/message.json'

// Components
import { GeneralTabComponent } from '../../components';

// Context
import { OfficeContext , SessionContext } from '../../context/';

// Constants
import { ROUTES } from '../../constants/';

const GeneralTabContainer: React.FC = () => {
  const { user:{rol:{name}} } = SessionContext.useState();
  const { officeDraft } = OfficeContext.useState();
  const officeDispatch = OfficeContext.useDispatch();
  const navigation = useNavigation();

  const submitFunction = (values: OfficeContext.OfficeToSend) => {
    Keyboard.dismiss();
    if(validationAccess(name,ROUTES.OFFICES_ROUTE,'read')){
    officeDispatch({
      type: OfficeContext.ActionTypes.SET_OFFICE_DRAFT,
      value: values,
    });
    navigation.navigate(ROUTES.OFFICE_CREDITS_TAB_ROUTE);
  }else{
    NotificationComponent(message[0].error.access)
  }
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
