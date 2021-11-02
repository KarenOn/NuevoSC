import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';

// Components
import { CreateAdvancementComponent } from '../../components';
import { NotificationComponent } from '../../components/common/';
import message from '../../utils/message.json';
import {validationAccess} from '../../utils/';

// Context
import {
  CreditContext,
  SessionContext,
  AdvancementContext,
} from '../../context/';

// Services
import { useCreateAdvancement } from '../../services/';

// Utils
import { getIsValidAmount, getPeriosity } from '../../utils/';
import { ROUTES } from '../../constants';

interface SubmitError {
  message?: string;
}

const defaultError: SubmitError = {};

const CreateAdvancementContainer: React.FC = () => {
  const {
    user: { id,rol:{name} },
  } = SessionContext.useState();
  const { advancementDraft } = AdvancementContext.useState();
  const { creditDraft } = CreditContext.useState();
  const [mutate, { status, error }] = useCreateAdvancement();
  const navigation = useNavigation();
  const [submitError, setSubmitError] = useState(defaultError);
  const periosityDays = getPeriosity(creditDraft.payment_periosity);
  const nextPaymentDate =
    creditDraft.payments_overdue?.toString() === '0'
      ? moment(creditDraft.next_payment_date)
          .add(periosityDays, 'days')
          .format('YYYY-MM-DD')
      : creditDraft.next_payment_date;

  const submitFunction = async (
    values: AdvancementContext.AdvancementToSend,
  ) => {
    setSubmitError({});
    const isValidAmount = getIsValidAmount(
      values.amount.toString(),
      creditDraft.balance?.toString() as string,
    );
    if(validationAccess(name,ROUTES.ADVANCEMENTS_ROUTE,'create')){
        if (isValidAmount.success) {
          const data: AdvancementContext.AdvancementToSend = {
            ...values,
            _user: id as number,
            _credit: creditDraft.id,
          };
          const rs = await mutate(data);
          if (rs?.data?.success) {
            navigation.goBack();
            NotificationComponent(message[0].success.operation)
          }
        } else {
          setSubmitError({ message: isValidAmount.message });
          NotificationComponent(message[0].error.operation)
        }
  }else{
    NotificationComponent(message[0].error.access)
  }
  };

  return (
    <CreateAdvancementComponent
      defaultValues={advancementDraft}
      status={status}
      error={error}
      submitFunction={submitFunction}
      submitError={submitError}
      nextPaymentDate={nextPaymentDate as string}
      paymentAmount={creditDraft.payment_amount as number}
      balance={creditDraft.balance as number}
    />
  );
};

export default CreateAdvancementContainer;
