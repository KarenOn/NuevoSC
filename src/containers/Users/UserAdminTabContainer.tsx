import React, { useEffect } from 'react';
import { Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NotificationComponent} from '../../components/common';
import {validationAccess} from '../../utils'
import message from '../../utils/message.json'

// Components
import { UserAdminTabComponent } from '../../components';
import { HashTable } from '../../components/Users/UserAdminTabComponent';

// Context
import {
  OfficeContext,
  SessionContext,
  RolContext,
  RouteContext,
} from '../../context/';

// Services
import {
  useCreateUser,
  useUpdateUser,
  useGetOffices,
  useGetRoles,
  useGetRoutes,
  useGetOffice,
  useGetRoute,
} from '../../services/';

// Constants
import { TextConstants,ROUTES } from '../../constants/';

// Utils
import {
  rolesSelectData,
  routesSelectData,
  officesSelectData,
} from '../../utils';

type SubmitType = 'save' | 'edit';

interface SubmitData {
  rol: string;
  route: string;
  office: string;
  phone_number: string;
  password: string;
}

const sendOffice = (value: HashTable) => {
  return (
    value &&
    (value.label.toLowerCase() === TextConstants.SUPERVISOR ||
      value.label.toLowerCase() === TextConstants.REVIEWER)
  );
};

const isAdmin = (value: HashTable) =>
  value && value.label.toLowerCase() === TextConstants.SUPERVISOR;

const isReviewer = (value: HashTable) =>
  value && value.label.toLowerCase() === TextConstants.REVIEWER;

const sendRoute = (value: HashTable) =>
  value && value.label.toLowerCase() === TextConstants.ADVISER;

const UserAdminTabContainer: React.FC = () => {
  const {
    userDraft,
    user: { id, rol:{name} },
  } = SessionContext.useState();
  const [mutate, { status, error }] = useCreateUser();
  const [
    editMutate,
    { status: editStatus, error: editError },
  ] = useUpdateUser();
  const navigation = useNavigation();
  const { params } = useRoute();
  const { offices } = OfficeContext.useState();
  const officeDispatch = OfficeContext.useDispatch();
  const [officeMutate] = useGetOffices();
  const { routes } = RouteContext.useState();
  const routeDispatch = RouteContext.useDispatch();
  const [routeMutate] = useGetRoutes();
  const { roles } = RolContext.useState();
  const rolDispatch = RolContext.useDispatch();
  const [rolMutate] = useGetRoles();
  const [officeByIdMutate] = useGetOffice();
  const [routeByIdMutate] = useGetRoute();

  useEffect(() => {
    const fetchData = async () => {
      const rs = await routeMutate();
      const officesRs = await officeMutate();
      const rolesRs = await rolMutate();

      if (
        rs &&
        rs.data.success &&
        officesRs &&
        officesRs.data.success &&
        rolesRs &&
        rolesRs.data.success
      ) {
        routeDispatch({
          type: RouteContext.ActionTypes.SET_ROUTES,
          value: rs.data.responseData,
        });
        officeDispatch({
          type: OfficeContext.ActionTypes.SET_OFFICES,
          value: officesRs.data.responseData,
        });
        rolDispatch({
          type: RolContext.ActionTypes.SET_ROLES,
          value: rolesRs.data.responseData,
        });
      }
    };

    fetchData();
  }, [
    routeMutate,
    routeDispatch,
    officeMutate,
    officeDispatch,
    rolMutate,
    rolDispatch,
  ]);

  const onCancel = () => navigation.goBack();

  const normalizeData = (values: SubmitData) => {
    const data: any = {
      ...userDraft,
      id: userDraft.id,
      _user: id as number,
      rol: {
        id: parseInt(values.rol, 0),
        name: rolesSelectData(roles).hashTable[values.rol]?.label,
      },
      password: values.password,
      phone_number: values.phone_number,
      office: undefined,
      route: undefined,
    };
    const rolName = rolesSelectData(roles).hashTable[values.rol];

    if (sendRoute(rolName)) {
      data.route = {
        id: parseInt(values.route, 0),
        name: routesSelectData(routes).hashTable[values.route]?.label,
      };
    }

    if (sendOffice(rolName)) {
      data.office = {
        id: parseInt(values.office, 0),
        name: officesSelectData(offices).hashTable[values.office]?.label,
      };
    }

    return data;
  };

  const onSave = async (data: SessionContext.UserToSend) => {
    if(validationAccess(name,ROUTES.USERS_ROUTE,'create')){
    const rs = await mutate(data);

    if (rs && rs.data.success) {
      // @ts-ignore
      params?.parentNavigator.goBack();
    }
  }else{
    NotificationComponent(message[0].error.access)
  }
  };

  const onEdit = async (data: SessionContext.UserToSend) => {
    if(validationAccess(name,ROUTES.USERS_ROUTE,'update')){
    const rs = await editMutate(data);

    if (rs && rs.data.success) {
      // @ts-ignore
      params?.parentNavigator.goBack();
    }
  }else{
    NotificationComponent(message[0].error.access)
  }
  };

  const showAlert = (
    data: SessionContext.UserToSend,
    message: string,
    submitType: SubmitType,
  ) => {
    Alert.alert(TextConstants.CONFIRM, message, [
      {
        text: 'Sí',
        onPress: () => (submitType === 'edit' ? onEdit(data) : onSave(data)),
      },
      {
        text: 'No',
        onPress: () => {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { office, route, ...sendData } = data;
          submitType === 'edit' ? onEdit(sendData) : onSave(sendData);
        },
      },
    ]);
  };

  const onSubmit = async (
    data: SessionContext.UserToSend,
    submitType: SubmitType,
  ) => {
    if (data.office && data.office.id) {
      const rs = await officeByIdMutate(data.office.id.toString());
      const rolName = rolesSelectData(roles).hashTable[data.rol.id];
      const userAdmin = isAdmin(rolName);
      const userAdviser = isReviewer(rolName);
      if (
        (rs &&
          userAdmin &&
          rs.data?.responseData?._admin &&
          rs.data.responseData._admin !== userDraft.id) ||
        (rs &&
          userAdviser &&
          rs.data?.responseData?._reviewer &&
          rs.data?.responseData?._reviewer !== userDraft.id)
      ) {
        showAlert(
          data,
          TextConstants.CREATE_USER_CHANGE_OFFICE_ALERT_MESSAGE,
          submitType,
        );
      } else {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { route, ...sendData } = data;
        submitType === 'edit' ? onEdit(sendData) : onSave(sendData);
      }
    } else if (data.route && data.route.id) {
      const rs = await routeByIdMutate(data.route.id.toString());
      if (
        rs &&
        rs.data?.responseData?._adviser &&
        rs.data?.responseData?._adviser !== userDraft.id
      ) {
        showAlert(
          data,
          TextConstants.CREATE_USER_CHANGE_ROUTE_ALERT_MESSAGE,
          submitType,
        );
      } else {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { office, ...sendData } = data;
        submitType === 'edit' ? onEdit(sendData) : onSave(sendData);
      }
    } else {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { office, route, ...sendData } = data;
      submitType === 'edit' ? onEdit(sendData) : onSave(sendData);
    }
  };

  const submitFunction = async (values: SubmitData) => {
    const data = normalizeData(values);
    onSubmit(data, 'save');
  };

  const onEditSubmit = (values: SubmitData) => {
    const data = normalizeData(values);
    onSubmit(data, 'edit');
  };

  return (
    <UserAdminTabComponent
      userId={userDraft.id as number}
      userName={userDraft.name}
      defaultValues={userDraft}
      status={status}
      error={error}
      submitFunction={submitFunction}
      onCancel={onCancel}
      offices={offices}
      roles={roles}
      routes={routes}
      onEdit={onEditSubmit}
      editStatus={editStatus}
      editError={editError}
    />
  );
};

export default UserAdminTabContainer;
