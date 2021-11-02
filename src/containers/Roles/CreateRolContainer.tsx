import React from 'react';
import { useNavigation } from '@react-navigation/native';
import {validationAccess} from '../../utils'
import message from '../../utils/message.json'
import { ROUTES } from '../../constants/';

// Components
import { CreateRolComponent } from '../../components';

// Context
import { RolContext, SessionContext } from '../../context/';

// Services
import { RolData, useCreateRol, useUpdateRol } from '../../services/';
import { NotificationComponent } from '../../components/common';

const CreateRolContainer: React.FC = () => {
  const {
    user: { id,rol:{name} },
  } = SessionContext.useState();
  const { rolDraft } = RolContext.useState();
  const [mutate, { status, error }] = useCreateRol();
  const [editMutate, { status: editStatus, error: editError }] = useUpdateRol();
  const navigation = useNavigation();

  const submitFunction = async (values: RolContext.Rol) => {
    const data: RolData = {
      ...values,
      _user: id?.toString() as string,
    };
    if(validationAccess(name,ROUTES.ROLES_ROUTE,'create')){
    const rs = await mutate(data);

    if (rs && rs.data.success) {
      NotificationComponent(message[0].success.operation)
      navigation.goBack();
    }
  }else{
    NotificationComponent(message[0].error.access)
  }

  };

  const onEdit = async (values: RolContext.Rol) => {
    const data: RolData = {
      ...values,
      _user: id?.toString() as string,
    };
    if(validationAccess(name,ROUTES.ROLES_ROUTE,'update')){
    const rs = await editMutate(data);

    if (rs && rs.data.success) {
      NotificationComponent(message[0].success.operation)
      navigation.goBack();
    }
  }else{
    NotificationComponent(message[0].error.access)
  }
  };

  return (
    <CreateRolComponent
      defaultValues={rolDraft}
      status={status}
      error={error}
      submitFunction={submitFunction}
      onEdit={onEdit}
      editStatus={editStatus}
      editError={editError}
    />
  );
};

export default CreateRolContainer;
