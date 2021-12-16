import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import {validationAccess} from '../../utils'
import message from '../../utils/message.json';
import { ROUTES } from '../../constants';
// Components
import { CreateTransferComponent } from '../../components';

// Context
import {
  SessionContext,
  TransferContext,
  OfficeContext,
  RouteContext,
} from '../../context/';

// Services
import {
  useCreateTransfer,
  useUpdateTransfer,
  useGetOffices,
  useGetRouteByOffice,
} from '../../services/';
import {NotificationComponent}from '../../components/common';

interface SubmitProps {
  office: number;
  route_origin?: number;
  route_destination?: number;
  details: string;
}

const CreateTransferContainer: React.FC = () => {
  const {
    user: { id ,rol:{name}},
  } = SessionContext.useState();
  const { transferDraft } = TransferContext.useState();
  const { offices } = OfficeContext.useState();
  const { routes } = RouteContext.useState();
  const officeDispatch = OfficeContext.useDispatch();
  const routeDispatch = RouteContext.useDispatch();
  const [officeMutate] = useGetOffices();
  const [routeMutate] = useGetRouteByOffice();
  const [mutate, { status, error }] = useCreateTransfer();
  const [
    editMutate,
    { status: editStatus, error: editError },
  ] = useUpdateTransfer();
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      const officesRs = await officeMutate();

      if (officesRs && officesRs.data.success) {
        officeDispatch({
          type: OfficeContext.ActionTypes.SET_OFFICES,
          value: officesRs.data.responseData,
        });
      }else{
        NotificationComponent(message[0].error.access)
      }

      if (transferDraft?.id) {
        const routeRs = await routeMutate(transferDraft.office_of_route);

        if (routeRs?.data?.success) {
          routeDispatch({
            type: RouteContext.ActionTypes.SET_ROUTES,
            value: routeRs.data.responseData,
          });
        }
      }
    };

    fetchData();
  }, [officeMutate, routeMutate, officeDispatch, routeDispatch, transferDraft]);

  const submitFunction = async (
    values: TransferContext.TransferToSend & SubmitProps,
  ) => {
    const data: TransferContext.TransferToSend = {
      ...values,
      _office: values.office,
      _route_origin: values.route_origin,
      _route_destination: values.route_destination,
      _user: id as number,
      observation: values.details,
    };

    const rs = await mutate(data);
    if(validationAccess(name,ROUTES.TRANSFER_ROUTE,'create')){
    if (rs && rs.data.success) {
      NotificationComponent(message[0].success.operation)
      navigation.goBack();
    }
  }else{
    NotificationComponent(message[0].error.access)
  }
  };

  const onEdit = async (
    values: TransferContext.TransferToSend & SubmitProps,
  ) => {
    const data: TransferContext.TransferToSend = {
      ...values,
      _office: values.office,
      _route_origin: values.route_origin,
      _route_destination: values.route_destination,
      _user: id as number,
      observation: values.details,
      id: transferDraft.id,
    };
    if(validationAccess(name,ROUTES.TRANSFER_ROUTE,'update')){
    const rs = await editMutate(data);

    if (rs && rs.data.success) {
      NotificationComponent(message[0].success.operation)
      navigation.goBack();
    }
  }else{
    NotificationComponent(message[0].error.access)
  }
  };

  const onOfficeChange = async (
    value: string,
    setFieldValue: (filed: string, value: string) => void,
  ) => {
    setFieldValue('route_origin', '');
    setFieldValue('route_destination', '');
    if (value) {
      try{
      const rs = await routeMutate(value)
      if (rs && rs.data.success) {
        routeDispatch({
          type: RouteContext.ActionTypes.SET_ROUTES,
          value: rs.data.responseData,
        });
      }
    }catch(error){
        NotificationComponent(message[0].error.operation)
      }
    } else {
      routeDispatch({
        type: RouteContext.ActionTypes.SET_ROUTES,
        value: [],
      });
    }
  };

  return (
    <CreateTransferComponent
      submitFunction={submitFunction}
      error={error}
      status={status}
      onEdit={onEdit}
      editError={editError}
      editStatus={editStatus}
      defaultValues={transferDraft}
      offices={offices}
      routes={routes}
      onOfficeChange={onOfficeChange}
    />
  );
};

export default CreateTransferContainer;
