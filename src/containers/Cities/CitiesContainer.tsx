import React, { useEffect, useState, useRef } from 'react';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import {NotificationComponent} from '../../components/common';
import message from '../../utils/message.json';
import {validationAccess} from '../../utils/';
// Components
import { CitiesComponent } from '../../components';

// Context
import { CityContext,SessionContext } from '../../context/';

// Constants
import { ROUTES } from '../../constants/';

// Mocks
import { cityMock } from '../../mocks/';

// Services
import {
  useGetCities,
  useGetCitiesWithFilter,
  useRemoveCity,
} from '../../services/';

const CitiesContainer: React.FC = () => {
  const [isFocus, setIsFocus] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [item, setItem] = useState({});
  const [filterValue, setFilterValue] = useState('');
  const [mutate, { status, error }] = useGetCities();
  const {
    user: {
      rol: { name },
    },
  } = SessionContext.useState();
  const [
    filterMutate,
    { error: filterError, reset },
  ] = useGetCitiesWithFilter();
  const [
    removeMutate,
    { error: removeError, reset: removeReset, status: removeStatus },
  ] = useRemoveCity();
  const { cities } = CityContext.useState();
  const cityDispatch = CityContext.useDispatch();
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const refFilter = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      const rs = await mutate();

      if (rs && rs.data.success) {
        cityDispatch({
          type: CityContext.ActionTypes.SET_CITIES,
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
  }, [isFocused, mutate, cityDispatch, filterValue, reset, removeReset]);

  const onAdd = () => {
  if(validationAccess(name,ROUTES.CITIES_ROUTE,'create')){
    cityDispatch({
      type: CityContext.ActionTypes.SET_CITY_DRAFT,
      value: cityMock,
    });
    onNavigate();
  }else{
    NotificationComponent(message[0].error.access)
  }
  };

  const onEdit = () => {
    if(validationAccess(name,ROUTES.CITIES_ROUTE,'update')){
    cityDispatch({
      type: CityContext.ActionTypes.SET_CITY_DRAFT,
      value: item,
    });
    onNavigate();
  }else{
    NotificationComponent(message[0].error.access)
  }
  };

  const onRemove = async () => {
    
    if(validationAccess(name,ROUTES.CITIES_ROUTE,'delete')){
      // @ts-ignore
    const rs = await removeMutate(item?.id);

    if (rs && rs.data.success) {
      // Close modal and reload
      onShowOverlay();
      const getRs = await mutate();
      if (getRs && getRs.data.success) {
        cityDispatch({
          type: CityContext.ActionTypes.SET_CITIES,
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
    navigation.navigate(ROUTES.CREATE_CITY_ROUTE);
  };

  const onShowOverlay = () => setShowOverlay(!showOverlay);

  const onSetItem = (value: CityContext.City) => setItem(value);

  const onFilterHandlerChange = async (filter: string) => {
    setFilterValue(filter);
    if (filter.length > 0) {
      const rs = await filterMutate(filter);

      if (rs && rs.data?.success) {
        cityDispatch({
          type: CityContext.ActionTypes.SET_CITIES,
          value: rs.data.responseData,
        });
      }
    }
  };

  const onHandlerFocus = () => setIsFocus(true);

  const onHandlerBlur = () => setIsFocus(false);

  return (
    <CitiesComponent
      isFocus={isFocus}
      onHandlerFocus={onHandlerFocus}
      onHandlerBlur={onHandlerBlur}
      refFilter={refFilter}
      filterValue={filterValue}
      onFilterHandlerChange={onFilterHandlerChange}
      editFunction={onEdit}
      showOverlay={showOverlay}
      onSetItem={onSetItem}
      item={item as CityContext.City}
      onShowOverlay={onShowOverlay}
      status={status}
      removeStatus={removeStatus}
      error={error}
      filterError={filterError}
      data={cities}
      addFunction={onAdd}
      onRemove={onRemove}
      removeError={removeError}
    />
  );
};

export default CitiesContainer;
