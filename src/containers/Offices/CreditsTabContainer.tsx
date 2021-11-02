import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NotificationComponent } from '../../components/common';
import {validationAccess} from '../../utils'
import message from '../../utils/message.json'
import { ROUTES } from '../../constants/';

// Components
import { CreditsTabComponent } from '../../components';

// Context
import { OfficeContext, SessionContext } from '../../context/';

// Services
import { useCreateOffice, useUpdateOffice } from '../../services/';

const CreditsTabContainer: React.FC = () => {
  const { officeDraft } = OfficeContext.useState();
  const {
    user: { id, rol:{name} },
  } = SessionContext.useState();
  const [mutate, { status, error }] = useCreateOffice();
  const [
    editMutate,
    { status: editStatus, error: editError },
  ] = useUpdateOffice();
  const navigation = useNavigation();
  const { params } = useRoute();

  const onCancel = () => navigation.goBack();

  const submitFunction = async (values: OfficeContext.OfficeToSend) => {
    const data: OfficeContext.OfficeToSend = {
      ...officeDraft,
      ...values,
      minimum_percent: 0,
      maximum_percent: 0,
      _user: id as number,
    };
    if(validationAccess(name,ROUTES.OFFICES_ROUTE,'create')){
    const rs = await mutate(data);

      if (rs && rs.data.success) {
        // @ts-ignore
        //
        params?.parentNavigator.goBack();
        NotificationComponent(message[0].success.operation);
      }
  }else{
    NotificationComponent(message[0].error.access)

    }
  };

  const onEdit = async (values: OfficeContext.OfficeToSend) => {
    const data: OfficeContext.OfficeToSend = {
      ...officeDraft,
      ...values,
      minimum_percent: 0,
      maximum_percent: 0,
      _user: id as number,
    };
    if(validationAccess(name,ROUTES.OFFICES_ROUTE,'update')){
    const rs = await editMutate(data);

    if (rs && rs.data.success) {
      // @ts-ignore
      //NotificationComponent('Operation success')
      params?.parentNavigator.goBack();
      NotificationComponent(message[0].success.access)
    }
  }else{
    NotificationComponent(message[0].error.access)
  }
  };

  return (
    <CreditsTabComponent
      officeId={officeDraft.id as number}
      officeName={officeDraft.name}
      defaultValues={officeDraft}
      status={status}
      error={error}
      submitFunction={submitFunction}
      onCancel={onCancel}
      onEdit={onEdit}
      editStatus={editStatus}
      editError={editError}
    />
  );
};

export default CreditsTabContainer;
