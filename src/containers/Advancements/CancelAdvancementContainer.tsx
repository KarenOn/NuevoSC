import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { NotificationComponent } from'../../components/common/';
import message from '../../utils/message.json';
import {validationAccess} from '../../utils/';
import { ROUTES } from '../../constants';


// Components
import { CancelAdvancementComponent } from '../../components';

// Context
import { AdvancementContext, SessionContext } from '../../context/';

// Services
import { useRemoveAdvancement, AdvancementRemoveData } from '../../services/';

interface SubmitProps {
  description: string;
}

const CancelAdvancementContainer: React.FC = () => {
  const {
    user: { id,rol:{name} },
  } = SessionContext.useState();
  const { advancementDraft } = AdvancementContext.useState();
  const [mutate, { status, error }] = useRemoveAdvancement();
  const navigation = useNavigation();

  const submitFunction = async (values: SubmitProps) => {
    const data: AdvancementRemoveData = {
      _user: id as number,
      id: advancementDraft.id as number,
      disabled: true,
      details: values.description,
    };
    if(validationAccess(name,ROUTES.ADVANCEMENTS_ROUTE,'delete')){
    const rs = await mutate(data);

    if (rs?.data?.success) {
      navigation.goBack();
      NotificationComponent(message[0].success.operation)
    }
  }else{
    NotificationComponent(message[0].error.access)
  }
  };

  return (
    <CancelAdvancementComponent
      status={status}
      error={error}
      submitFunction={submitFunction}
    />
  );
};

export default CancelAdvancementContainer;
