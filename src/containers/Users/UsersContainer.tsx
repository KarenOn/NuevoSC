import React, { useEffect, useState, useRef } from 'react';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { NotificationComponent} from '../../components/common';
import {validationAccess} from '../../utils'
import message from '../../utils/message.json'
// Components
import { UsersComponent } from '../../components';

// Context
import { SessionContext } from '../../context';

// Constants
import { ROUTES } from '../../constants';

// Mocks
import { userMock } from '../../mocks';

// Services
import {
  DisabledData,
  useGetUsers,
  useGetUsersWithFilter,
  useRemoveUser,
} from '../../services';

const UsersContainer: React.FC = () => {
  const [isFocus, setIsFocus] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [item, setItem] = useState({});
  const [filterValue, setFilterValue] = useState('');
  const [mutate, { status, error }] = useGetUsers();
  const [filterMutate, { error: filterError, reset }] = useGetUsersWithFilter();
  const [
    removeMutate,
    { error: removeError, reset: removeReset, status: removeStatus },
  ] = useRemoveUser();
  const {
    users,
    user: {
      id,
      rol: { name },
    },
  } = SessionContext.useState();
  const userDispatch = SessionContext.useDispatch();
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const refFilter = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      const rs = await mutate();

      if (rs && rs.data.success) {
        userDispatch({
          type: SessionContext.ActionTypes.SET_USERS,
          value: rs.data.responseData,
        });
      }

      if (isFocus) {
        // @ts-ignore
        refFilter.current.focus();
      }
    };

    if (isFocused && !filterValue) {
      reset();
      removeReset();
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused, mutate, userDispatch, filterValue, reset, removeReset]);

  const onAdd = () => {
    if(validationAccess(name,ROUTES.USERS_ROUTE,'create')){
    userDispatch({
      type: SessionContext.ActionTypes.SET_NEW_USER_DRAFT,
      value: {
        ...userMock,
        city: { id: '' },
        office: { id: '' },
        rol: { id: '' },
        route: { id: '' },
        document_type: { id: '' },
      },
    });
    onNavigate();
  }else{
    NotificationComponent(message[0].error.access)
  }
  };

  const onEdit = () => {
    if(validationAccess(name,ROUTES.USERS_ROUTE,'update')){
    userDispatch({
      type: SessionContext.ActionTypes.SET_USER_DRAFT,
      value: item,
    });
    onNavigate();
  }else{
    NotificationComponent(message[0].error.access)
  }
  };

  const onRemove = async () => {
    const data: DisabledData = {
      // @ts-ignore
      id: item.id,
      // @ts-ignore
      disabled: !item.disabled,
      _user: id as number,
    };
    if(validationAccess(name,ROUTES.USERS_ROUTE,'delete')){
    const rs = await removeMutate(data);

    if (rs && rs.data.success) {
      // Close modal and reload
      onShowOverlay();
      const getRs = await mutate();
      if (getRs && getRs.data.success) {
        userDispatch({
          type: SessionContext.ActionTypes.SET_USERS,
          value: getRs.data.responseData,
        });
      }
    }}else{
      NotificationComponent(message[0].error.access)
    }
  };

  const onNavigate = () => {
    // @ts-ignore
    refFilter.current.blur();
    setFilterValue('');
    setIsFocus(false);
    navigation.navigate(ROUTES.CREATE_USER_ROUTE);
  };

  const onShowOverlay = () => setShowOverlay(!showOverlay);

  const onSetItem = (value: SessionContext.User) => setItem(value);

  const onFilterHandlerChange = async (filter: string) => {
    setFilterValue(filter);
    if (filter.length > 0) {
      const rs = await filterMutate(filter);

      if (rs && rs.data?.success) {
        userDispatch({
          type: SessionContext.ActionTypes.SET_USERS,
          value: rs.data.responseData,
        });
      }
    }
  };

  const onHandlerFocus = () => setIsFocus(true);

  const onHandlerBlur = () => setIsFocus(false);

  return (
    <UsersComponent
      isFocus={isFocus}
      onHandlerFocus={onHandlerFocus}
      onHandlerBlur={onHandlerBlur}
      refFilter={refFilter}
      filterValue={filterValue}
      onFilterHandlerChange={onFilterHandlerChange}
      editFunction={onEdit}
      showOverlay={showOverlay}
      onSetItem={onSetItem}
      item={item as SessionContext.User}
      onShowOverlay={onShowOverlay}
      status={status}
      error={error}
      filterError={filterError}
      data={users}
      addFunction={onAdd}
      removeStatus={removeStatus}
      onRemove={onRemove}
      removeError={removeError}
      rolName={name}
    />
  );
};

export default UsersContainer;
