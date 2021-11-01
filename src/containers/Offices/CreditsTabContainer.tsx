import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NotificationComponent } from '../../components/common';

// Components
import { CreditsTabComponent } from '../../components';

// Context
import { OfficeContext, SessionContext } from '../../context/';

// Services
import { useCreateOffice, useUpdateOffice } from '../../services/';

const CreditsTabContainer: React.FC = () => {
  const { officeDraft } = OfficeContext.useState();
  const {
    user: { id },
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
    const rs = await mutate(data);

    if (rs && rs.data.success) {
      // @ts-ignore
      //NotificationComponent('Operation success');
      params?.parentNavigator.goBack();
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
    const rs = await editMutate(data);

    if (rs && rs.data.success) {
      // @ts-ignore
      //NotificationComponent('Operation success')
      params?.parentNavigator.goBack();
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
