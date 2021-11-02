import React from 'react';
import { useNavigation } from '@react-navigation/native';
import message from '../../utils/message.json'
import {validationAccess} from '../../utils/';

// Components
import { CreateCityComponent } from '../../components';

// Context
import { CityContext, SessionContext } from '../../context/';

// Services
import { cityData, useCreateCity, useUpdateCity } from '../../services/';
import { NotificationComponent } from '../../components/common';
import { ROUTES } from '../../constants';

const CreateCityContainer: React.FC = () => {
  const {
    user: { id,rol:{name} },
  } = SessionContext.useState();
  const { cityDraft } = CityContext.useState();
  const [mutate, { status, error }] = useCreateCity();
  const [
    editMutate,
    { status: editStatus, error: editError },
  ] = useUpdateCity();
  const navigation = useNavigation();

  const submitFunction = async (values: CityContext.City) => {
    const data: cityData = {
      ...values,
      _user: id?.toString() as string,
    };
  if(validationAccess(name,ROUTES.CITIES_ROUTE,'create')){
    const rs = await mutate(data);
    if (rs && rs.data.success) {
      NotificationComponent(message[0].success.operation)
      navigation.goBack();
    }
  }else{
    NotificationComponent(message[0].error.access)
  }
  };

  const onEdit = async (values: CityContext.City) => {
   
    const data: cityData = {
      ...values,
      _user: id?.toString() as string,
    }; 
  if(validationAccess(name,ROUTES.CITIES_ROUTE,'create')){
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
    <CreateCityComponent
      defaultValues={cityDraft}
      status={status}
      error={error}
      submitFunction={submitFunction}
      onEdit={onEdit}
      editStatus={editStatus}
      editError={editError}
    />
  );
};

export default CreateCityContainer;
