import React from 'react';
import { useNavigation } from '@react-navigation/native';

// Components
import { CreateCityComponent } from '../../components';

// Context
import { CityContext, SessionContext } from '../../context/';

// Services
import { cityData, useCreateCity, useUpdateCity } from '../../services/';

const CreateCityContainer: React.FC = () => {
  const {
    user: { id },
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
    const rs = await mutate(data);

    if (rs && rs.data.success) {
      navigation.goBack();
    }
  };

  const onEdit = async (values: CityContext.City) => {
    const data: cityData = {
      ...values,
      _user: id?.toString() as string,
    };
    const rs = await editMutate(data);

    if (rs && rs.data.success) {
      navigation.goBack();
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
