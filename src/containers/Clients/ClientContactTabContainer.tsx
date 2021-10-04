import React, { useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

// Components
import { ClientContactTabComponent } from '../../components';

// Context
import { ClientContext, SessionContext, RouteContext } from '../../context/';

// Services
import {
  useCreateClient,
  useUpdateClient,
  useGetRoutes,
} from '../../services/';

interface SubmitData extends ClientContext.ClientToSend {
  route: number;
}

const ClientContactTabContainer: React.FC = () => {
  const { clientDraft } = ClientContext.useState();
  const {
    user: { id },
  } = SessionContext.useState();
  const [mutate, { status, error }] = useCreateClient();
  const [
    editMutate,
    { status: editStatus, error: editError },
  ] = useUpdateClient();
  const navigation = useNavigation();
  const { params } = useRoute();
  const [routeMutate] = useGetRoutes();
  const { routes } = RouteContext.useState();
  const routeDispatch = RouteContext.useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const rs = await routeMutate();

      if (rs && rs.data.success) {
        routeDispatch({
          type: RouteContext.ActionTypes.SET_ROUTES,
          value: rs.data.responseData,
        });
      }
    };

    fetchData();
  }, [routeMutate, routeDispatch]);

  const onCancel = () => navigation.goBack();

  const submitFunction = async (values: SubmitData) => {
    const data: ClientContext.ClientToSend = {
      ...values,
      _user: id,
      _document_type: clientDraft.document_type.id,
      _route: values.route,
    };
    const rs = await mutate(data);

    if (rs && rs.data.success) {
      // @ts-ignore
      params?.parentNavigator.goBack();
    }
  };

  const onEdit = async (values: SubmitData) => {
    const data: ClientContext.ClientToSend = {
      ...values,
      _user: id,
      _document_type: clientDraft.document_type.id,
      _route: values.route,
    };
    const rs = await editMutate(data);

    if (rs && rs.data.success) {
      // @ts-ignore
      params?.parentNavigator.goBack();
    }
  };

  return (
    <ClientContactTabComponent
      _id={clientDraft.id as number}
      name={clientDraft.name}
      defaultValues={clientDraft}
      status={status}
      error={error}
      submitFunction={submitFunction}
      onCancel={onCancel}
      onEdit={onEdit}
      editStatus={editStatus}
      editError={editError}
      routes={routes}
    />
  );
};

export default ClientContactTabContainer;
