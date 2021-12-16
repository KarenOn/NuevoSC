import React, { useEffect, useState, useRef } from 'react';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { NotificationComponent} from '../../components/common';
import {validationAccess} from '../../utils'
import message from '../../utils/message.json'
// Components
import { TransfersComponent } from '../../components';

// Context
import { TransferContext, SessionContext } from '../../context/';

// Constants
import { ROUTES } from '../../constants/';

// Mocks
import { transferMock } from '../../mocks/';

// Services
import {
  DisabledData,
  useGetTransfers,
  useGetTransfersWithFilter,
  useRemoveTransfer,
} from '../../services/';

const TransfersContainer: React.FC = () => {
  const [isFocus, setIsFocus] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [item, setItem] = useState({});
  const [filterValue, setFilterValue] = useState('');
  const [mutate, { status, error }] = useGetTransfers();
  const onShowOverlay = () => setShowOverlay(!showOverlay);
  const onSetItem = (value: TransferContext.Transfer) => setItem(value);
  const [
    filterMutate,
    { error: filterError, reset },
  ] = useGetTransfersWithFilter();
  const [
    removeMutate,
    { error: removeError, reset: removeReset, status: removeStatus },
  ] = useRemoveTransfer();
  const {
    user: {
      id,
      rol: { name },
    },
  } = SessionContext.useState();
  const { transfers } = TransferContext.useState();
  const transferDispatch = TransferContext.useDispatch();
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const refFilter = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      const rs = await mutate();

      if (rs && rs.data.success) {
        transferDispatch({
          type: TransferContext.ActionTypes.SET_TRANSFERS,
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
  }, [transfers,mutate,isFocused]);

  const onAdd = () => {
    if(validationAccess(name,ROUTES.TRANSFER_ROUTE,'create')){
    transferDispatch({
      type: TransferContext.ActionTypes.SET_TRANSFER_DRAFT,
      value: {
        ...transferMock,
        office: { id: '' },
        route_origin: { id: '' },
        route_destination: { id: '' },
      },
    });
    onNavigate();
  }else{
    NotificationComponent(message[0].error.access)
  }
  };

  const onEdit = () => {
    if(validationAccess(name,ROUTES.TRANSFER_ROUTE,'update')){
    transferDispatch({
      type: TransferContext.ActionTypes.SET_TRANSFER_DRAFT,
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
    if(validationAccess(name,ROUTES.TRANSFER_ROUTE,'delete')){
    const rs = await removeMutate(data);

    if (rs && rs.data.success) {
      // Close modal and reload
      onShowOverlay();
      const getRs = await mutate();
      if (getRs && getRs.data.success) {
        transferDispatch({
          type: TransferContext.ActionTypes.SET_TRANSFERS,
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
    navigation.navigate(ROUTES.CREATE_TRANSFER_ROUTE);
  };

  

  const onFilterHandlerChange = async (filter: string) => {
    setFilterValue(filter);
    if (filter.length > 0) {
      const rs = await filterMutate(filter);

      if (rs && rs.data?.success) {
        transferDispatch({
          type: TransferContext.ActionTypes.SET_TRANSFERS,
          value: rs.data.responseData,
        });
      }
    }
  };

  const onHandlerFocus = () => setIsFocus(true);

  const onHandlerBlur = () => setIsFocus(false);

  return (
    <TransfersComponent
      isFocus={isFocus}
      onHandlerFocus={onHandlerFocus}
      onHandlerBlur={onHandlerBlur}
      refFilter={refFilter}
      filterValue={filterValue}
      onFilterHandlerChange={onFilterHandlerChange}
      editFunction={onEdit}
      showOverlay={showOverlay}
      onSetItem={onSetItem}
      item={item as TransferContext.Transfer}
      onShowOverlay={onShowOverlay}
      status={status}
      error={error}
      filterError={filterError}
      data={transfers}
      addFunction={onAdd}
      removeStatus={removeStatus}
      onRemove={onRemove}
      removeError={removeError}
      rolName={name}
    />
  );
};

export default TransfersContainer;
