import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {validationAccess} from '../../utils/';
import message from '../../utils/message.json';
import {ROUTES} from '../../constants/'

// Components
import { CreateCreditComponent } from '../../components';

// Context
import { CreditContext, SessionContext, ClientContext } from '../../context/';
import { NotificationComponent } from '../../components/common'

// Services
import { useCreateCredit, useGetClients } from '../../services/';

// Utils
import {
  getPayments,
  getIsValidDuration,
  getIsValidCreditAmount,
} from '../../utils';

// Constants
import { TextConstants } from '../../constants/';

interface SubmitProps {
  client: number;
  specialCredit: boolean;
}

interface SubmitError {
  message?: string;
}

const defaultError: SubmitError = {};

const CreateCreditContainer: React.FC = () => {
  const {
    user: {
      id,
      can_create_special_credits,
      rol: { name: rolName },
      minCreditValue,
      maxCreditValue,
    },
  } = SessionContext.useState();
  const { creditDraft } = CreditContext.useState();
  const { clients } = ClientContext.useState();
  const clientDispatch = ClientContext.useDispatch();
  const [mutate, { status, error }] = useCreateCredit();
  const [clientMutate] = useGetClients();
  const navigation = useNavigation();
  const [submitError, setSubmitError] = useState(defaultError);
  const canCreateSpecialCredit =
    can_create_special_credits === true || rolName === TextConstants.MANAGER;
  const min_credit_value =
    rolName === TextConstants.MANAGER || rolName === TextConstants.ADMIN
      ? 1
      : minCreditValue;

  const max_credit_value =
    rolName === TextConstants.MANAGER || rolName === TextConstants.ADMIN
      ? 999999999
      : maxCreditValue;

  useEffect(() => {
    const fetchData = async () => {
      const rs = await clientMutate();

      if (rs?.data?.success) {
        clientDispatch({
          type: ClientContext.ActionTypes.SET_CLIENTS,
          value: rs.data.responseData,
        });
      }
    };

    fetchData();
  }, [clientMutate, clientDispatch]);

  const submitFunction = async (
    values: CreditContext.CreditToSend & SubmitProps,
  ) => {
    setSubmitError({});
    let percent: number = 0;
    const _duration: string = values.duration.toString();
    const parseDuration = parseInt(_duration, 0);
    const isValidDuration = getIsValidDuration(
      values.payment_periosity,
      parseDuration,
    );

    const isValidCreditAmount = getIsValidCreditAmount(
      min_credit_value as number,
      max_credit_value as number,
      values.amount.toString(),
    );
  if(validationAccess(rolName,ROUTES.CREDITS_ROUTE,'create')){
    if (isValidDuration.success) {
      if (isValidCreditAmount.success) {
        const payments = getPayments(values.payment_periosity, parseDuration);

        if (!values.specialCredit) {
          percent = 20;
        } else {
          percent = values.percent;
        }

        const data: CreditContext.CreditToSend = {
          ...values,
          _client: values.client,
          _user: id as number,
          payments,
          percent,
        };

        const rs = await mutate(data);

        if (rs?.data?.success) {
          NotificationComponent(message[0].success.operation);
          navigation.goBack();
        }else{
          NotificationComponent(message[0].error.operation)
        }
      } else {
        setSubmitError({ message: isValidCreditAmount.message });
      }
    } else {
      setSubmitError({ message: isValidDuration.message });
    }
  }else{
      NotificationComponent(message[0].error.access)
    }
  };

  return (
    <CreateCreditComponent
      defaultValues={creditDraft}
      status={status}
      error={error}
      submitFunction={submitFunction}
      clients={clients}
      submitError={submitError}
      canCreateSpecialCredit={canCreateSpecialCredit}
    />
  );
};

export default CreateCreditContainer;
