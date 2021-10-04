import React from 'react';
import { useNavigation } from '@react-navigation/native';

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
    user: { id },
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

    const rs = await mutate(data);

    if (rs?.data?.success) {
      navigation.goBack();
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
