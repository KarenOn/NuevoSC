import React from 'react';
import { View, StyleProp, ViewStyle } from 'react-native';

// Components
import Text from '../CustomText/CustomTextComponent';

// Assets
import { GeneralStyles } from '../../../assets/';

interface Props {
  title: string;
  value: string | number;
  style?: StyleProp<ViewStyle>;
}

const ReadOnlyInputComponent = ({ title, value, style }: Props) => {
  return (
    <View
      style={[
        GeneralStyles.flexRow,
        GeneralStyles.justifyBetween,
        GeneralStyles.alignCenter,
        style,
      ]}>
      <Text bold style={GeneralStyles.fontSize18}>
        {title}
      </Text>
      <Text style={GeneralStyles.fontSize16}>{value}</Text>
    </View>
  );
};

export default ReadOnlyInputComponent;
