import React, { useEffect, useState, useRef } from 'react';
import { useNavigation, useIsFocused } from '@react-navigation/native';

// Components
import { AdvancementsComponent } from '../../components';

// Context
import { AdvancementContext, SessionContext } from '../../context/';

// Constants
import { ROUTES } from '../../constants/';

// Services
import {
  useGetAdvancements,
  useGetAdvancementsWithFilter,
} from '../../services/';

const AdvancementsContainer: React.FC = () => {
  const [isFocus, setIsFocus] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [item, setItem] = useState({});
  const [filterValue, setFilterValue] = useState('');
  const [mutate, { status, error }] = useGetAdvancements();
  const [
    filterMutate,
    { error: filterError, reset },
  ] = useGetAdvancementsWithFilter();
  const {
    user: {
      rol: { name },
    },
  } = SessionContext.useState();
  const { advancements } = AdvancementContext.useState();
  const advancementDispatch = AdvancementContext.useDispatch();
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const refFilter = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      const rs = await mutate();

      if (rs && rs.data.success) {
        advancementDispatch({
          type: AdvancementContext.ActionTypes.SET_ADVANCEMENTS,
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
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused, mutate, advancementDispatch, filterValue, reset]);

  const onRemove = () => {
    advancementDispatch({
      type: AdvancementContext.ActionTypes.SET_ADVANCEMENT_DRAFT,
      value: item,
    });
    onShowOverlay();
    // @ts-ignore
    refFilter.current.blur();
    setFilterValue('');
    setIsFocus(false);
    navigation.navigate(ROUTES.CANCEL_ADVANCEMENT_ROUTE);
  };

  const onShowOverlay = () => setShowOverlay(!showOverlay);

  const onSetItem = (value: AdvancementContext.Advancement) => setItem(value);

  const onFilterHandlerChange = async (filter: string) => {
    setFilterValue(filter);
    if (filter.length > 0) {
      const rs = await filterMutate(filter);

      if (rs?.data?.success) {
        advancementDispatch({
          type: AdvancementContext.ActionTypes.SET_ADVANCEMENTS,
          value: rs.data.responseData,
        });
      }
    }
  };

  const onHandlerFocus = () => setIsFocus(true);

  const onHandlerBlur = () => setIsFocus(false);

  return (
    <AdvancementsComponent
      isFocus={isFocus}
      onHandlerFocus={onHandlerFocus}
      onHandlerBlur={onHandlerBlur}
      refFilter={refFilter}
      filterValue={filterValue}
      onFilterHandlerChange={onFilterHandlerChange}
      showOverlay={showOverlay}
      onSetItem={onSetItem}
      item={item as AdvancementContext.Advancement}
      onShowOverlay={onShowOverlay}
      status={status}
      error={error}
      filterError={filterError}
      data={advancements}
      onRemove={onRemove}
      rolName={name}
    />
  );
};

export default AdvancementsContainer;
