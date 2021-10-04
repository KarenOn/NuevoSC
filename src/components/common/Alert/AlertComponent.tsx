import React from 'react';
import { View, StyleProp, ViewStyle, TextStyle } from 'react-native';

// Components
import Text from '../CustomText/CustomTextComponent';

// Assets
import styles from './styles';

type alertType = 'danger' | 'primary';

interface Props {
  type: alertType;
  title: string;
}

const AlertComponent = ({ type, title }: Props) => {
  let containerStyle: StyleProp<ViewStyle> = [styles.containerStyle];
  let textStyle: StyleProp<TextStyle> = {};
  switch (type) {
    case 'danger': {
      containerStyle.push(styles.dangerContainer);
      textStyle = styles.dangerText;
      break;
    }

    case 'primary': {
      containerStyle.push(styles.primaryContainer);
      textStyle = styles.primaryText;
      break;
    }
  }

  return (
    <View style={containerStyle}>
      <Text style={textStyle}>{title}</Text>
    </View>
  );
};

export default AlertComponent;
