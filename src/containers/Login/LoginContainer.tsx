import React from 'react';
import { useNavigation } from '@react-navigation/native';

// Components
import { LoginComponent } from '../../components/';

// Services
import { LoginData, useLogin } from '../../services/';
import { setToken } from '../../services/config';

// Constants
import { ROUTES } from '../../constants/';

// Context
import { SessionContext } from '../../context/';

const LoginContainer: React.FC = () => {
  const [mutate, { status, error }] = useLogin();
  const sessionDispatch = SessionContext.useDispatch();
  const navigation = useNavigation();

  const submitFunction = async (data: LoginData) => {

    console.log( data );
    
    const rs = await mutate(data);

    console.log( rs );

    if (rs && rs.data.success) {
      sessionDispatch({
        type: SessionContext.ActionTypes.SET_USER,
        value: {
          ...rs.data.responseData.user,
          can_create_special_credits:
            rs.data.responseData.can_create_special_credits,
          minCreditValue: rs.data.responseData.minCreditValue,
          maxCreditValue: rs.data.responseData.maxCreditValue,
        },
      });/*
      sessionDispatch({
        type: SessionContext.ActionTypes.SET_AUTH_TOKEN,
        value: rs.data.responseData.token,
      });*/
      sessionDispatch({
        type: SessionContext.ActionTypes.SET_IS_AUTHENTICATED,
        value: true,
      });
      setToken(rs.data.responseData.token);
      // navigation.navigate(ROUTES.VERIFICATION_ROUTE);

      //navigation.navigate(ROUTES.DASHBOARD_ROUTE);
    }
  };

  return (
    <LoginComponent
      status={status}
      error={error}
      submitFunction={submitFunction}
    />
  );
};

export default LoginContainer;
