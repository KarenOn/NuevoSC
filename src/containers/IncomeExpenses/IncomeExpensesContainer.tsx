import React, { useEffect, useState, useRef } from 'react';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import {validationAccess} from '../../utils'
import message from '../../utils/message.json'
// Components
import { IncomeExpensesComponent } from '../../components';
import {NotificationComponent} from '../../components/common';
// Context
import { IncomeExpenseContext, SessionContext } from '../../context/';

// Constants
import { ROUTES } from '../../constants/';

// Mocks
import { incomeExpenseMock } from '../../mocks/';

// Services
import {
  DisabledData,
  useGetIncomeExpenses,
  useGetIncomeExpensesWithFilter,
  useRemoveIncomeExpense,
} from '../../services/';

const IncomeExpensesContainer: React.FC = () => {
  const [isFocus, setIsFocus] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [item, setItem] = useState({});
  const [filterValue, setFilterValue] = useState('');
  const [mutate, { status, error }] = useGetIncomeExpenses();
  const [
    filterMutate,
    { error: filterError, reset },
  ] = useGetIncomeExpensesWithFilter();
  const [
    removeMutate,
    { error: removeError, reset: removeReset, status: removeStatus },
  ] = useRemoveIncomeExpense();
  const {
    user: {
      id,
      rol: { name },
    },
  } = SessionContext.useState();
  const { incomeExpenses } = IncomeExpenseContext.useState();
  const incomeExpenseDispatch = IncomeExpenseContext.useDispatch();
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const refFilter = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      const rs = await mutate();

      if (rs && rs.data.success) {
        incomeExpenseDispatch({
          type: IncomeExpenseContext.ActionTypes.SET_INCOME_EXPENSES,
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
  }, [
    isFocused,
    mutate,
    incomeExpenseDispatch,
    filterValue,
    reset,
    removeReset,
  ]);

  const onAdd = () => {
    if(validationAccess(name,ROUTES.INCOME_EXPENSE_ROUTE,'create')){
    incomeExpenseDispatch({
      type: IncomeExpenseContext.ActionTypes.SET_INCOME_EXPENSE_DRAFT,
      value: {
        ...incomeExpenseMock,
        income_expense_type: { id: '' },
        income_expense_category: { id: '' },
        income_expense_concept: { id: '' },
        office: { id: '' },
        route: { id: '' },
      },
    });
    onNavigate();
  }else{
    NotificationComponent(message[0].error.access)
  }
  };

  const onEdit = () => {
    if(validationAccess(name,ROUTES.INCOME_EXPENSE_ROUTE,'update')){
    incomeExpenseDispatch({
      type: IncomeExpenseContext.ActionTypes.SET_INCOME_EXPENSE_DRAFT,
      value: item,
    });
    onNavigate();
  }else{
    NotificationComponent(message[0].error.access)
  }
  };

  const onRemove = async () => {
    if(validationAccess(name,ROUTES.INCOME_EXPENSE_ROUTE,'delete')){
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
      NotificationComponent(message[0].success.operation)
      const getRs = await mutate();
      if (getRs && getRs.data.success) {
        incomeExpenseDispatch({
          type: IncomeExpenseContext.ActionTypes.SET_INCOME_EXPENSES,
          value: getRs.data.responseData,
        });
      }
    }}
    else{
      NotificationComponent(message[0].error.access)
    }
  };

  const onNavigate = () => {
    // @ts-ignore
    refFilter.current.blur();
    setFilterValue('');
    setIsFocus(false);
    navigation.navigate(ROUTES.CREATE_INCOME_EXPENSE_ROUTE);
  };

  const onShowOverlay = () => setShowOverlay(!showOverlay);

  const onSetItem = (value: IncomeExpenseContext.IncomeExpense) =>
    setItem(value);

  const onFilterHandlerChange = async (filter: string) => {
    setFilterValue(filter);
    if (filter.length > 0) {
      const rs = await filterMutate(filter);

      if (rs && rs.data?.success) {
        incomeExpenseDispatch({
          type: IncomeExpenseContext.ActionTypes.SET_INCOME_EXPENSES,
          value: rs.data.responseData,
        });
      }
    }
  };

  const onHandlerFocus = () => setIsFocus(true);

  const onHandlerBlur = () => setIsFocus(false);

  return (
    <IncomeExpensesComponent
      isFocus={isFocus}
      onHandlerFocus={onHandlerFocus}
      onHandlerBlur={onHandlerBlur}
      refFilter={refFilter}
      filterValue={filterValue}
      onFilterHandlerChange={onFilterHandlerChange}
      editFunction={onEdit}
      showOverlay={showOverlay}
      onSetItem={onSetItem}
      item={item as IncomeExpenseContext.IncomeExpense}
      onShowOverlay={onShowOverlay}
      status={status}
      error={error}
      filterError={filterError}
      data={incomeExpenses}
      addFunction={onAdd}
      removeStatus={removeStatus}
      onRemove={onRemove}
      removeError={removeError}
      rolName={name}
    />
  );
};

export default IncomeExpensesContainer;
