import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { NotificationComponent } from '../../components/common'
import { validationAccess } from '../../utils/'
import message from '../../utils/message.json';
import { ROUTES} from '../../constants/';
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
    user: { id ,rol:{name}},
  } = SessionContext.useState();
  const { creditDraft } = CreditContext.useState();
  const [mutate, { status, error }] = useRemoveCredit();
  const navigation = useNavigation();

  const submitFunction = async (values: SubmitProps) => {
   if( validationAccess(name,ROUTES.CREDITS_ROUTE,'delete')){
    const data = {
      _user: id as number,
      id: creditDraft.id as number,
      disabled: true,
      observation: values.description,
    };

    const rs = await mutate(data);

    if (rs?.data?.success) {
      NotificationComponent(message[0].success.operation)
      navigation.goBack();
    }
  }else{
    NotificationComponent(message[0].error.access)
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
