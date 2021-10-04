import React from 'react';
import { View } from 'react-native';
import { truncate } from 'lodash';

// Components
import Text from '../CustomText/CustomTextComponent';
import Button from '../CustomButton/CustomButtonComponent';

// Assets
import { GeneralStyles } from '../../../assets/';
import styles from './styles';

// Utils
import { status } from '../../../utils/helpers';

interface Props {
  id?: string;
  name: string;
  item: any;
  onPress?: (item: any) => void;
  type: status;
  btnTitle?: string;
}

const getBG = (type: status) => {
  switch (type) {
    case 'default':
      return styles.defaultBG;

    case 'warning':
      return styles.warningBG;

    case 'disabled':
      return styles.disabledBG;

    case 'completed':
      return styles.completedBG;

    default:
      return styles.disabledBG;
  }
};

const getTextColor = (type: status) => {
  switch (type) {
    case 'default':
    case 'warning':
      return {};

    case 'disabled':
      return styles.disabledTextColor;

    default:
      return {};
  }
};

const getBorderColor = (type: status) => {
  switch (type) {
    case 'default':
    case 'warning':
      return styles.defaultSeparatorColor;

    case 'disabled':
      return styles.disabledSeparatorColor;

    default:
      return styles.defaultSeparatorColor;
  }
};

const CustomListItemComponent = (props: Props) => {
  const { id, name, onPress, item, type, btnTitle } = props;

  const bgStyle = getBG(type);
  const textStyle = getTextColor(type);
  const separatorBorderColor = getBorderColor(type);

  const onHandlerPress = () => {
    if (onPress) {
      onPress(item);
    }
  };

  return (
    <View style={[GeneralStyles.marginB15]}>
      <View
        style={[
          GeneralStyles.flexRow,
          GeneralStyles.justifyBetween,
          styles.container,
          bgStyle,
        ]}>
        <View style={[GeneralStyles.paddingV10, GeneralStyles.paddingL10]}>
          <Text style={textStyle}>{id}</Text>
          <Text bold style={[GeneralStyles.fontSize16, textStyle]}>
            {truncate(name, { length: 30 })}
          </Text>
        </View>
        <View style={[styles.rightButtonContainer, separatorBorderColor]}>
          <Button
            buttonStyle={[styles.rightButton, bgStyle]}
            onPress={onHandlerPress}
            title={btnTitle || 'Ver'}
            titleStyle={[textStyle, GeneralStyles.fontBold]}
          />
        </View>
      </View>
    </View>
  );
};

export default CustomListItemComponent;
