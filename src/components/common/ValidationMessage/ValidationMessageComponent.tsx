import React from 'react';
import { View, StyleProp, ViewStyle } from 'react-native';
import { Icon } from 'react-native-elements';
import { moderateScale } from 'react-native-size-matters';

// Assets
import { Colors, GeneralStyles } from '../../../assets/';
import styles from './styles';

// Components
import { default as Text } from '../CustomText/CustomTextComponent';

interface Props {
  children: string;
  style?: StyleProp<ViewStyle>;
}

const ValidationMessageComponent: React.FC<Props> = (props) => {
  const { children, style } = props;

  if (!children) {
    return null;
  }

  return (
    <View style={[GeneralStyles.flexRow, styles.container, style]}>
      <Icon
        size={moderateScale(22, 0.3)}
        color={Colors.danger}
        type="evilicon"
        name="exclamation"
      />
      <Text danger>{children}</Text>
    </View>
  );
};

export default ValidationMessageComponent;
