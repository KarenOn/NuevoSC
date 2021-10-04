import React, { useEffect, useState, useRef } from 'react';
import { useNavigation, useIsFocused } from '@react-navigation/native';

// Components
import { ClientsComponent } from '../../components';

// Context
import {
  ClientContext,
  SessionContext,
  OfficeContext,
  RouteContext,
} from '../../context/';

// Constants
import { ROUTES } from '../../constants/';

// Mocks
import { clientMock } from '../../mocks/';

// Services
import {
  DisabledData,
  useGetClients,
  useGetClientsWithFilter,
  useRemoveClient,
  useGetOffices,
  useGetRouteByOffice,
  useGetClientsWithSelectFilter,
} from '../../services/';

const ClientsContainer: React.FC = () => {
  const [isFocus, setIsFocus] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [item, setItem] = useState({});
  const [filterValue, setFilterValue] = useState('');
  const [officeFilter, setOfficeFilter] = useState('');
  const [routeFilter, setRouteFilter] = useState('');
  const [mutate, { status, error }] = useGetClients();
  const [officesMutate] = useGetOffices();
  const [routesMutate] = useGetRouteByOffice();
  const [clientBySelectMutate] = useGetClientsWithSelectFilter();
  const [
    filterMutate,
    { error: filterError, reset },
  ] = useGetClientsWithFilter();
  const [
    removeMutate,
    { error: removeError, reset: removeReset, status: removeStatus },
  ] = useRemoveClient();
  const {
    user: {
      id,
      rol: { name },
    },
  } = SessionContext.useState();
  const { clients } = ClientContext.useState();
  const { offices } = OfficeContext.useState();
  const { routes } = RouteContext.useState();
  const clientDispatch = ClientContext.useDispatch();
  const officeDispatch = OfficeContext.useDispatch();
  const routeDispatch = RouteContext.useDispatch();
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const refFilter = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      const rs = await mutate();
      const officeRs = await officesMutate();

      if (rs && rs.data.success) {
        clientDispatch({
          type: ClientContext.ActionTypes.SET_CLIENTS,
          value: rs.data.responseData,
        });
      }

      if (officeRs?.data?.success) {
        officeDispatch({
          type: OfficeContext.ActionTypes.SET_OFFICES,
          value: officeRs.data.responseData,
        });
      }

      if (isFocus) {
        // @ts-ignore
        refFilter.current.focus();
      }
    };

    if (isFocused && !filterValue && !officeFilter && !routeFilter) {
      reset();
      removeReset();
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    isFocused,
    mutate,
    clientDispatch,
    filterValue,
    reset,
    removeReset,
    officeDispatch,
    officesMutate,
  ]);

  const onAdd = () => {
    clientDispatch({
      type: ClientContext.ActionTypes.SET_NEW_CLIENT_DRAFT,
      value: {
        ...clientMock,
        document_type: { id: '' },
        route: { id: '' },
      },
    });
    onNavigate();
  };

  const onEdit = () => {
    clientDispatch({
      type: ClientContext.ActionTypes.SET_CLIENT_DRAFT,
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
        clientDispatch({
          type: ClientContext.ActionTypes.SET_CLIENTS,
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
    navigation.navigate(ROUTES.CREATE_CLIENT_ROUTE);
  };

  const onShowOverlay = () => setShowOverlay(!showOverlay);

  const onSetItem = (value: ClientContext.Client) => setItem(value);

  const onFilterHandlerChange = async (filter: string) => {
    setFilterValue(filter);
    setOfficeFilter('');
    setRouteFilter('');
    if (filter.length > 0) {
      const rs = await filterMutate(filter);

      if (rs && rs.data?.success) {
        clientDispatch({
          type: ClientContext.ActionTypes.SET_CLIENTS,
          value: rs.data.responseData,
        });
      }
    }
  };

  const onHandlerFocus = () => setIsFocus(true);

  const onHandlerBlur = () => setIsFocus(false);

  const onOfficeHandlerChange = async (value: string) => {
    setOfficeFilter(value);
    setRouteFilter('');
    setFilterValue('');

    routeDispatch({
      type: RouteContext.ActionTypes.SET_ROUTES,
      value: [],
    });

    if (value) {
      const routeRs = await routesMutate(value);
      if (routeRs?.data?.success) {
        routeDispatch({
          type: RouteContext.ActionTypes.SET_ROUTES,
          value: routeRs.data.responseData,
        });
      }

      const data = {
        _office: value,
        _route: '',
      };

      const rs = await clientBySelectMutate(data);

      if (rs?.data?.success) {
        clientDispatch({
          type: ClientContext.ActionTypes.SET_CLIENTS,
          value: rs.data.responseData,
        });
      }
    } else {
      const rs = await mutate();

      if (rs?.data?.success) {
        clientDispatch({
          type: ClientContext.ActionTypes.SET_CLIENTS,
          value: rs.data.responseData,
        });
      }
    }
  };

  const onRouteHandlerChange = async (value: string) => {
    setRouteFilter(value);
    setFilterValue('');

    const data = {
      _office: officeFilter,
      _route: value,
    };

    const rs = await clientBySelectMutate(data);

    if (rs?.data?.success) {
      clientDispatch({
        type: ClientContext.ActionTypes.SET_CLIENTS,
        value: rs.data.responseData,
      });
    }
  };

  return (
    <ClientsComponent
      isFocus={isFocus}
      onHandlerFocus={onHandlerFocus}
      onHandlerBlur={onHandlerBlur}
      refFilter={refFilter}
      filterValue={filterValue}
      onFilterHandlerChange={onFilterHandlerChange}
      editFunction={onEdit}
      showOverlay={showOverlay}
      onSetItem={onSetItem}
      item={item as ClientContext.Client}
      onShowOverlay={onShowOverlay}
      status={status}
      error={error}
      filterError={filterError}
      data={clients}
      addFunction={onAdd}
      removeStatus={removeStatus}
      onRemove={onRemove}
      removeError={removeError}
      rolName={name}
      officeSelectChange={onOfficeHandlerChange}
      officeValue={officeFilter}
      offices={offices}
      routeSelectChange={onRouteHandlerChange}
      routeValue={routeFilter}
      routes={routes}
    />
  );
};

export default ClientsContainer;
