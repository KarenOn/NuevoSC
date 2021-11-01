import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NotificationComponent} from '../../components/common';
// Components
import { CreateRouteComponent } from '../../components';

// Context
import {
  RouteContext,
  SessionContext,
  OfficeContext,
  CityContext,
} from '../../context/';

// Services
import {
  useCreateRoute,
  useGetOffices,
  useGetCities,
  useUpdateRoute,
} from '../../services/';

interface SubmitProps {
  city: number;
  office: number;
}

const CreateRouteContainer: React.FC = () => {
  const {
    user: { id },
  } = SessionContext.useState();
  const { routeDraft } = RouteContext.useState();
  const { offices } = OfficeContext.useState();
  const { cities } = CityContext.useState();
  const officeDispatch = OfficeContext.useDispatch();
  const cityDispatch = CityContext.useDispatch();
  const [mutate, { status, error }] = useCreateRoute();
  const [officeMutate] = useGetOffices();
  const [cityMutate] = useGetCities();
  const navigation = useNavigation();
  const [
    editMutate,
    { status: editStatus, error: editError },
  ] = useUpdateRoute();

  useEffect(() => {
    const fetchData = async () => {
      const rs = await cityMutate();
      const officesRs = await officeMutate();

      if (rs && rs.data.success && officesRs && officesRs.data.success) {
        cityDispatch({
          type: CityContext.ActionTypes.SET_CITIES,
          value: rs.data.responseData,
        });
        officeDispatch({
          type: OfficeContext.ActionTypes.SET_OFFICES,
          value: officesRs.data.responseData,
        });
      }
    };

    fetchData();
  }, [officeMutate, officeDispatch, cityMutate, cityDispatch]);

  const submitFunction = async (
    values: RouteContext.RouteToSend & SubmitProps,
  ) => {
    const data: RouteContext.RouteToSend = {
      ...values,
      _city: values.city,
      _office: values.office,
      _user: id as number,
    };
    const rs = await mutate(data);

    if (rs && rs.data.success) {
      NotificationComponent('Operation success')
      navigation.goBack();
    }
  };

  const onEdit = async (values: RouteContext.Route & SubmitProps) => {
    const data: RouteContext.RouteToSend = {
      ...values,
      _city: values.city,
      _office: values.office,
      _user: id as number,
    };
    const rs = await editMutate(data);

    if (rs && rs.data.success) {
      NotificationComponent('Operation success')
      navigation.goBack();
    }
  };

  return (
    <CreateRouteComponent
      defaultValues={routeDraft}
      status={status}
      error={error}
      submitFunction={submitFunction}
      offices={offices}
      cities={cities}
      onEdit={onEdit}
      editStatus={editStatus}
      editError={editError}
    />
  );
};

export default CreateRouteContainer;
