import React, { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import {validationAccess} from '../../utils'
import message from '../../utils/message.json'
import { NotificationComponent } from '../../components/common';
import { ROUTES } from '../../constants/';

// Components
import { AdviserReportComponent } from '../../components';

// Services
import { useAdviserDayMovements } from '../../services';

const AdviserReportContainer: React.FC = () => {
  const [item, setItem] = useState({});
  const [mutate, { status, error }] = useAdviserDayMovements();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      setItem({});
    }
  }, [isFocused]);

  const submitFunction = async () => {
    const rs = await mutate();
    console.log(rs);
    if (rs && rs.data?.success) {
      setItem(rs.data.responseData);
    }
  };

  return (
    <AdviserReportComponent
      submitFunction={submitFunction}
      status={status}
      error={error}
      item={item}
    />
  );
};

export default AdviserReportContainer;
