import React, { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';

// Components
import { RouteBalanceReportComponent } from '../../components';

// Context
import { OfficeContext, RouteContext } from '../../context/';

// Services
import {
  useGetOffices,
  useGetRouteByOffice,
  useRouteBalance,
  RouteBalanceData,
} from '../../services/';

// Constants
import { BASE_URL } from '../../constants';

const RouteBalanceReportContainer: React.FC = () => {
  const [link, setLink] = useState('');
  const { offices } = OfficeContext.useState();
  const { routes } = RouteContext.useState();
  const officeDispatch = OfficeContext.useDispatch();
  const routeDispatch = RouteContext.useDispatch();
  const [officeMutate] = useGetOffices();
  const [routeMutate] = useGetRouteByOffice();
  const [mutate, { status, error }] = useRouteBalance();
  const isFocused = useIsFocused();

  useEffect(() => {
    const fetchData = async () => {
      const officesRs = await officeMutate();

      if (officesRs?.data?.success) {
        officeDispatch({
          type: OfficeContext.ActionTypes.SET_OFFICES,
          value: officesRs.data.responseData,
        });
      }
    };

    fetchData();

    if (isFocused) {
      setLink('');
    }
  }, [officeMutate, officeDispatch, isFocused]);

  const submitFunction = async (values: RouteBalanceData) => {
    const rs = await mutate(values);

    if (rs?.data?.success) {
      const { path, fileName } = rs.data.responseData;
      setLink(`${BASE_URL}api/openReport?path=${path}&fileName=${fileName}`);
    }
  };

  const onOfficeChange = async (
    value: string,
    setFieldValue: (filed: string, value: string) => void,
  ) => {
    setFieldValue('route', '');
    setLink('');
    if (value) {
      const rs = await routeMutate(value);
      if (rs?.data?.success) {
        routeDispatch({
          type: RouteContext.ActionTypes.SET_ROUTES,
          value: rs.data.responseData,
        });
      }
    } else {
      routeDispatch({
        type: RouteContext.ActionTypes.SET_ROUTES,
        value: [],
      });
    }
  };

  const onRouteChange = () => setLink('');

  return (
    <RouteBalanceReportComponent
      submitFunction={submitFunction}
      error={error}
      status={status}
      offices={offices}
      routes={routes}
      onOfficeChange={onOfficeChange}
      link={link}
      onRouteChange={onRouteChange}
    />
  );
};

export default RouteBalanceReportContainer;
