import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';

// Components
import { SmsVerificationComponent } from '../../components';

// Services
import { useSmsVerification } from '../../services';

// Context
import { SessionContext } from '../../context/';

// Constants
import { STORAGE_TOKEN_KEY, STORAGE_USER_KEY } from '../../constants/';

const SmsVerificationContainer: React.FC = () => {
  const [mutate, { status, error }] = useSmsVerification();
  const sessionDispatch = SessionContext.useDispatch();
  const { authToken, user } = SessionContext.useState();

  const submitFunction = async (value: string) => {
    const rs = await mutate(value);

    // @ts-ignore
    if (rs?.data?.success) {
      AsyncStorage.setItem(STORAGE_TOKEN_KEY, authToken);
      AsyncStorage.setItem(STORAGE_USER_KEY, JSON.stringify(user));
      sessionDispatch({
        type: SessionContext.ActionTypes.SET_IS_AUTHENTICATED,
        value: true,
      });
    }
  };

  return (
    <SmsVerificationComponent
      status={status}
      error={error}
      submitFunction={submitFunction}
    />
  );
};

export default SmsVerificationContainer;
