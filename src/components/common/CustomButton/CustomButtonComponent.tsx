import React from 'react';
import { Button, ButtonProps } from 'react-native-elements';
import { StyleProp, ViewStyle } from 'react-native';

// Assets
import { GeneralStyles } from '../../../assets/';

interface Props extends ButtonProps {
  secondary?: boolean;
  danger?: boolean;
}

const CustomButtonComponent = ({ secondary, danger, ...otherProps }: Props) => {
  let buttonStyle: StyleProp<ViewStyle> = GeneralStyles.primaryButton;
  let disabledStyle: StyleProp<ViewStyle> = GeneralStyles.primaryButtonDisabled;

  if (secondary) {
    buttonStyle = GeneralStyles.secondaryButton;
    disabledStyle = GeneralStyles.secondaryButtonDisabled;
  }

  if (danger) {
    buttonStyle = GeneralStyles.dangerButton;
    disabledStyle = GeneralStyles.dangerButtonDisabled;
  }

  return (
    <Button
      titleStyle={[GeneralStyles.fontBold, GeneralStyles.fontSize18]}
      buttonStyle={[buttonStyle, GeneralStyles.defaultButton]}
      disabledStyle={disabledStyle}
      {...otherProps}
    />
  );
};

export default CustomButtonComponent;
