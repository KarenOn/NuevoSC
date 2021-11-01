import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { NotificationComponent } from '../../components/common'

// Components
import { CancelCreditComponent } from '../../components';

// Context
import { CreditContext, SessionContext } from '../../context/';

// Services
import { useRemoveCredit } from '../../services/';

interface SubmitProps {
  description: string;
}

const CancelCreditContainer: React.FC = () => {
  const {
    user: { id },
  } = SessionContext.useState();
  const { creditDraft } = CreditContext.useState();
  const [mutate, { status, error }] = useRemoveCredit();
  const navigation = useNavigation();

  const submitFunction = async (values: SubmitProps) => {
    const data = {
      _user: id as number,
      id: creditDraft.id as number,
      disabled: true,
      observation: values.description,
    };

    const rs = await mutate(data);

    if (rs?.data?.success) {
      NotificationComponent('operation success!!')
      navigation.goBack();
    }
  };

  return (
    <CancelCreditComponent
      status={status}
      error={error}
      submitFunction={submitFunction}
    />
  );
};

export default CancelCreditContainer;
