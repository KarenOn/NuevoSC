import React, { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';

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

    if (rs && rs.data?.success) {
      console.log(rs.data.responseData);
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
