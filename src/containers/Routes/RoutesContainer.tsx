import React, { useEffect, useState, useRef } from 'react';
import { useNavigation, useIsFocused } from '@react-navigation/native';

// Components
import { RoutesComponent } from '../../components';

// Context
import { RouteContext, SessionContext } from '../../context/';

// Constants
import { ROUTES } from '../../constants/';

// Mocks
import { routeMock } from '../../mocks/';

// Services
import {
  DisabledData,
  useGetRoutes,
  useGetRoutesWithFilter,
  useRemoveRoute,
} from '../../services/';

const RoutesContainer: React.FC = () => {
  const [isFocus, setIsFocus] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [item, setItem] = useState({});
  const [filterValue, setFilterValue] = useState('');
  const [mutate, { status, error }] = useGetRoutes();
  const [
    filterMutate,
    { error: filterError, reset },
  ] = useGetRoutesWithFilter();
  const [
    removeMutate,
    { error: removeError, reset: removeReset, status: removeStatus },
  ] = useRemoveRoute();
  const {
    user: {
      id,
      rol: { name },
    },
  } = SessionContext.useState();
  const { routes } = RouteContext.useState();
  const routeDispatch = RouteContext.useDispatch();
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const refFilter = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      const rs = await mutate();

      if (rs && rs.data.success) {
        routeDispatch({
          type: RouteContext.ActionTypes.SET_ROUTES,
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
  }, [isFocused, mutate, routeDispatch, filterValue, reset, removeReset]);

  const onAdd = () => {
    routeDispatch({
      type: RouteContext.ActionTypes.SET_ROUTE_DRAFT,
      value: {
        ...routeMock,
        city: { id: '' },
        office: { id: '' },
      },
    });
    onNavigate();
  };

  const onEdit = () => {
    routeDispatch({
      type: RouteContext.ActionTypes.SET_ROUTE_DRAFT,
      value: item,
    });
    onNavigate();
  };

  const onRemove = async () => {
    const data: DisabledData = {
      // @ts-ignore
      id: item.id,
      // @ts-ignore
      disabled: !item.disabled,
      _user: id as number,
    };
    const rs = await removeMutate(data);

    if (rs && rs.data.success) {
      // Close modal and reload
      onShowOverlay();
      const getRs = await mutate();
      if (getRs && getRs.data.success) {
        routeDispatch({
          type: RouteContext.ActionTypes.SET_ROUTES,
          value: getRs.data.responseData,
        });
      }
    }
  };

  const onNavigate = () => {
    // @ts-ignore
    refFilter.current.blur();
    setFilterValue('');
    setIsFocus(false);
    navigation.navigate(ROUTES.CREATE_ROUTE_ROUTE);
  };

  const onShowOverlay = () => setShowOverlay(!showOverlay);

  const onSetItem = (value: RouteContext.Route) => setItem(value);

  const onFilterHandlerChange = async (filter: string) => {
    setFilterValue(filter);
    if (filter.length > 0) {
      const rs = await filterMutate(filter);

      if (rs && rs.data?.success) {
        routeDispatch({
          type: RouteContext.ActionTypes.SET_ROUTES,
          value: rs.data.responseData,
        });
      }
    }
  };

  const onHandlerFocus = () => setIsFocus(true);

  const onHandlerBlur = () => setIsFocus(false);

  return (
    <RoutesComponent
      isFocus={isFocus}
      onHandlerFocus={onHandlerFocus}
      onHandlerBlur={onHandlerBlur}
      refFilter={refFilter}
      filterValue={filterValue}
      onFilterHandlerChange={onFilterHandlerChange}
      editFunction={onEdit}
      showOverlay={showOverlay}
      onSetItem={onSetItem}
      item={item as RouteContext.Route}
      onShowOverlay={onShowOverlay}
      status={status}
      error={error}
      filterError={filterError}
      data={routes}
      addFunction={onAdd}
      removeStatus={removeStatus}
      onRemove={onRemove}
      removeError={removeError}
      rolName={name}
    />
  );
};

export default RoutesContainer;
