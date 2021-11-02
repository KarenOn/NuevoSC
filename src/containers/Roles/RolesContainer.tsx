import React, { useEffect, useState, useRef } from 'react';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import {validationAccess} from '../../utils'
import message from '../../utils/message.json'
import { NotificationComponent } from '../../components/common';


// Components
import { RolesComponent } from '../../components';

// Context
import { RolContext,SessionContext } from '../../context/';

// Constants
import { ROUTES } from '../../constants/';

// Mocks
import { rolMock } from '../../mocks/';

// Services
import {
  useGetRoles,
  useGetRolesWithFilter,
  useRemoveRol,
} from '../../services/';

const RolesContainer: React.FC = () => {
  const {user:{rol:{name}}} = SessionContext.useState()
  const [isFocus, setIsFocus] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [item, setItem] = useState({});
  const [filterValue, setFilterValue] = useState('');
  const [mutate, { status, error }] = useGetRoles();
  const [filterMutate, { error: filterError, reset }] = useGetRolesWithFilter();
  const [
    removeMutate,
    { error: removeError, reset: removeReset, status: removeStatus },
  ] = useRemoveRol();
  const { roles } = RolContext.useState();
  const rolDispatch = RolContext.useDispatch();
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const refFilter = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      const rs = await mutate();

      if (rs && rs.data.success) {
        rolDispatch({
          type: RolContext.ActionTypes.SET_ROLES,
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
  }, [isFocused, mutate, rolDispatch, filterValue, reset, removeReset]);

  const onAdd = () => {
    if(validationAccess(name,ROUTES.ROLES_ROUTE,'create')){
    rolDispatch({
      type: RolContext.ActionTypes.SET_ROL_DRAFT,
      value: rolMock,
    });
    onNavigate();
  }else{
    NotificationComponent(message[0].error.access)
  }
  };

  const onEdit = () => {
    if(validationAccess(name,ROUTES.ROLES_ROUTE,'update')){
    rolDispatch({
      type: RolContext.ActionTypes.SET_ROL_DRAFT,
      value: item,
    });
    onNavigate();
  }else{
    NotificationComponent(message[0].error.access)
  }
  };

  const onRemove = async () => {
    if(validationAccess(name,ROUTES.ROLES_ROUTE,'delete')){
    // @ts-ignore
    const rs = await removeMutate(item.id);

    if (rs && rs.data.success) {
      // Close modal and reload
      onShowOverlay();
      const getRs = await mutate();
      if (getRs && getRs.data.success) {
        rolDispatch({
          type: RolContext.ActionTypes.SET_ROLES,
          value: getRs.data.responseData,
        });
      }
    }
  }else{
    NotificationComponent(message[0].error.access)
  }
  };

  const onNavigate = () => {
    // @ts-ignore
    refFilter.current.blur();
    setFilterValue('');
    setIsFocus(false);
    navigation.navigate(ROUTES.CREATE_ROL_ROUTE);
  };

  const onShowOverlay = () => setShowOverlay(!showOverlay);

  const onSetItem = (value: RolContext.Rol) => setItem(value);

  const onFilterHandlerChange = async (filter: string) => {
    setFilterValue(filter);

    if (filter.length > 0) {
      const rs = await filterMutate(filter);

      if (rs && rs.data.success) {
        rolDispatch({
          type: RolContext.ActionTypes.SET_ROLES,
          value: rs.data.responseData,
        });
      }
    }
  };

  const onHandlerFocus = () => setIsFocus(true);

  const onHandlerBlur = () => setIsFocus(false);

  return (
    <RolesComponent
      isFocus={isFocus}
      onHandlerFocus={onHandlerFocus}
      onHandlerBlur={onHandlerBlur}
      refFilter={refFilter}
      filterValue={filterValue}
      onFilterHandlerChange={onFilterHandlerChange}
      editFunction={onEdit}
      showOverlay={showOverlay}
      onSetItem={onSetItem}
      item={item as RolContext.Rol}
      onShowOverlay={onShowOverlay}
      status={status}
      removeStatus={removeStatus}
      error={error}
      filterError={filterError}
      data={roles}
      addFunction={onAdd}
      onRemove={onRemove}
      removeError={removeError}
    />
  );
};

export default RolesContainer;
