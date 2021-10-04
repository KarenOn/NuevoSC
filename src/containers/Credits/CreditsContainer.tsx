import React, { useEffect, useState, useRef } from 'react';
import { useNavigation, useIsFocused } from '@react-navigation/native';

// Components
import { CreditsComponent } from '../../components';

// Context
import { CreditContext, SessionContext } from '../../context/';

// Constants
import { ROUTES } from '../../constants/';

// Mocks
import { creditMock } from '../../mocks/';

// Services
import {
  useGetCredits,
  useGetCreditsWithFilter,
  VisitCreditData,
  useVisitCredit,
} from '../../services/';

const CreditsContainer: React.FC = () => {
  const [isFocus, setIsFocus] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [item, setItem] = useState({});
  const [filterValue, setFilterValue] = useState('');
  const [mutate, { status, error }] = useGetCredits();
  const [
    visitMutate,
    { error: visitError, reset: visitReset, status: visitStatus },
  ] = useVisitCredit();
  const [
    filterMutate,
    { error: filterError, reset },
  ] = useGetCreditsWithFilter();
  const {
    user: {
      id,
      rol: { name },
    },
  } = SessionContext.useState();
  const { credits } = CreditContext.useState();
  const creditDispatch = CreditContext.useDispatch();
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const refFilter = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      const rs = await mutate();

      if (rs && rs.data.success) {
        creditDispatch({
          type: CreditContext.ActionTypes.SET_CREDITS,
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
      visitReset();
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused, mutate, creditDispatch, filterValue, reset, visitReset]);

  const onAdd = () => {
    creditDispatch({
      type: CreditContext.ActionTypes.SET_NEW_CREDIT_DRAFT,
      value: {
        ...creditMock,
        client: { id: '' },
      },
    });
    onNavigate();
  };

  const onRemove = () => {
    creditDispatch({
      type: CreditContext.ActionTypes.SET_NEW_CREDIT_DRAFT,
      value: {
        ...creditMock,
        // @ts-ignore
        id: item.id,
      },
    });
    onShowOverlay();
    // @ts-ignore
    refFilter.current.blur();
    setFilterValue('');
    setIsFocus(false);
    navigation.navigate(ROUTES.CANCEL_CREDIT_ROUTE);
  };

  const onVisit = async () => {
    const data: VisitCreditData = {
      // @ts-ignore
      id: item.id,
      _user: id as number,
    };
    const rs = await visitMutate(data);

    if (rs && rs.data.success) {
      // Close modal and reload
      onShowOverlay();
      if (filterValue.length > 0) {
        onFilterHandlerChange(filterValue);
      } else {
        const getRs = await mutate();
        if (getRs?.data?.success) {
          creditDispatch({
            type: CreditContext.ActionTypes.SET_CREDITS,
            value: getRs.data.responseData,
          });
        }
      }
    }
  };

  const onAdvancement = () => {
    creditDispatch({
      type: CreditContext.ActionTypes.SET_NEW_CREDIT_DRAFT,
      value: {
        ...item,
      },
    });
    onShowOverlay();
    // @ts-ignore
    refFilter.current.blur();
    setFilterValue('');
    setIsFocus(false);
    navigation.navigate(ROUTES.ADVANCEMENT_CREDIT_ROUTE);
  };

  const onNavigate = () => {
    // @ts-ignore
    refFilter.current.blur();
    setFilterValue('');
    setIsFocus(false);
    navigation.navigate(ROUTES.CREATE_CREDIT_ROUTE);
  };

  const onShowOverlay = () => setShowOverlay(!showOverlay);

  const onSetItem = (value: CreditContext.Credit) => setItem(value);

  const onFilterHandlerChange = async (filter: string) => {
    setFilterValue(filter);
    if (filter.length > 0) {
      const rs = await filterMutate(filter);

      if (rs?.data?.success) {
        creditDispatch({
          type: CreditContext.ActionTypes.SET_CREDITS,
          value: rs.data.responseData,
        });
      }
    }
  };

  const onHandlerFocus = () => setIsFocus(true);

  const onHandlerBlur = () => setIsFocus(false);

  return (
    <CreditsComponent
      isFocus={isFocus}
      onHandlerFocus={onHandlerFocus}
      onHandlerBlur={onHandlerBlur}
      refFilter={refFilter}
      filterValue={filterValue}
      onFilterHandlerChange={onFilterHandlerChange}
      showOverlay={showOverlay}
      onSetItem={onSetItem}
      item={item as CreditContext.Credit}
      onShowOverlay={onShowOverlay}
      status={status}
      error={error}
      filterError={filterError}
      data={credits}
      addFunction={onAdd}
      onRemove={onRemove}
      rolName={name}
      onVisit={onVisit}
      visitError={visitError}
      visitStatus={visitStatus}
      onAdvancement={onAdvancement}
    />
  );
};

export default CreditsContainer;
