import React from 'react';
import { Switch, View, SwitchProps } from 'react-native';

// Components
import Text from '../CustomText/CustomTextComponent';

// Assets
import { GeneralStyles } from '../../../assets/';

interface Props extends SwitchProps {
  label: string;
}

const CustomSwitchComponent = ({ label, ...otherProps }: Props) => {
  return (
    <View
      style={[
        GeneralStyles.flexRow,
        GeneralStyles.alignCenter,
        GeneralStyles.justifyBetween,
      ]}>
      <Text style={GeneralStyles.fontSize18} bold>
        {label}
      </Text>
      <Switch {...otherProps} />
    </View>
  );
};

export default CustomSwitchComponent;
