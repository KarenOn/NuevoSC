import React, { useEffect, useState, useRef } from 'react';
import { useNavigation, useIsFocused } from '@react-navigation/native';

// Components
import { OfficesComponent } from '../../components';

// Context
import { OfficeContext, SessionContext } from '../../context/';

// Constants
import { ROUTES } from '../../constants/';

// Mocks
import { officeMock } from '../../mocks/';

// Services
import {
  DisabledData,
  useGetOffices,
  useGetOfficesWithFilter,
  useRemoveOffice,
} from '../../services/';

const OfficesContainer: React.FC = () => {
  const [isFocus, setIsFocus] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [item, setItem] = useState({});
  const [filterValue, setFilterValue] = useState('');
  const [mutate, { status, error }] = useGetOffices();
  const [
    filterMutate,
    { error: filterError, reset },
  ] = useGetOfficesWithFilter();
  const [
    removeMutate,
    { error: removeError, reset: removeReset, status: removeStatus },
  ] = useRemoveOffice();
  const {
    user: {
      id,
      rol: { name },
    },
  } = SessionContext.useState();
  const { offices } = OfficeContext.useState();
  const officeDispatch = OfficeContext.useDispatch();
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const refFilter = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      const rs = await mutate();

      if (rs && rs.data.success) {
        officeDispatch({
          type: OfficeContext.ActionTypes.SET_OFFICES,
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
  }, [isFocused, mutate, officeDispatch, filterValue, reset, removeReset]);

  const onAdd = () => {
    officeDispatch({
      type: OfficeContext.ActionTypes.SET_NEW_OFFICE_DRAFT,
      value: officeMock,
    });
    onNavigate();
  };

  const onEdit = () => {
    officeDispatch({
      type: OfficeContext.ActionTypes.SET_OFFICE_DRAFT,
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
        officeDispatch({
          type: OfficeContext.ActionTypes.SET_OFFICES,
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
    navigation.navigate(ROUTES.CREATE_OFFICE_ROUTE);
  };

  const onShowOverlay = () => setShowOverlay(!showOverlay);

  const onSetItem = (value: OfficeContext.Office) => setItem(value);

  const onFilterHandlerChange = async (filter: string) => {
    setFilterValue(filter);
    if (filter.length > 0) {
      const rs = await filterMutate(filter);

      if (rs && rs.data?.success) {
        officeDispatch({
          type: OfficeContext.ActionTypes.SET_OFFICES,
          value: rs.data.responseData,
        });
      }
    }
  };

  const onHandlerFocus = () => setIsFocus(true);

  const onHandlerBlur = () => setIsFocus(false);

  return (
    <OfficesComponent
      isFocus={isFocus}
      onHandlerFocus={onHandlerFocus}
      onHandlerBlur={onHandlerBlur}
      refFilter={refFilter}
      filterValue={filterValue}
      onFilterHandlerChange={onFilterHandlerChange}
      editFunction={onEdit}
      showOverlay={showOverlay}
      onSetItem={onSetItem}
      item={item as OfficeContext.Office}
      onShowOverlay={onShowOverlay}
      status={status}
      error={error}
      filterError={filterError}
      data={offices}
      addFunction={onAdd}
      removeStatus={removeStatus}
      onRemove={onRemove}
      removeError={removeError}
      rolName={name}
    />
  );
};

export default OfficesContainer;
