import React from 'react';
import { Header, HeaderProps, Icon } from 'react-native-elements';
import { moderateScale } from 'react-native-size-matters';

// Assets
import styles from './styles';
import { Colors, GeneralStyles } from '../../../assets/';

// Components
import Text from '../CustomText/CustomTextComponent';

interface Props extends HeaderProps {
  rightIconType: string;
  rightIconName: string;
  rightIconColor: string;
  rightIconPress: () => void;
  title: string;
}

const CustomHeaderComponent = (props: Props) => {
  const {
    rightIconType,
    rightIconName,
    rightIconColor,
    rightIconPress,
    title,
  } = props;

  return (
    <Header
      backgroundColor={Colors.transparent}
      containerStyle={styles.containerStyle}
      leftComponent={
        <Icon
          type={rightIconType}
          name={rightIconName}
          color={rightIconColor}
          size={moderateScale(40, 0.3)}
          onPress={rightIconPress}
          underlayColor={Colors.transparent}
        />
      }
      centerComponent={
        <Text
          style={[GeneralStyles.fontSize18, GeneralStyles.textCenter]}
          upper
          bold>
          {title}
        </Text>
      }
    />
  );
};

export default CustomHeaderComponent;
