import React, { ReactNode, ReactNodeArray, Ref } from 'react';
import { TextProps, Text } from 'react-native-elements';
import { StyleProp, TextStyle } from 'react-native';

// Assets
import styles from './Styles';
import { GeneralStyles } from '../../../assets/';

export interface Props extends TextProps {
  /** React component default prop */
  children?: ReactNode | ReactNodeArray | string;
  /** Flag to add styles for bold text */
  bold?: boolean;
  /** Flag to add styles for danger text, usually for errors */
  danger?: boolean;
  /** Flag to add styles for light text */
  light?: boolean;
  /** Flag to add styles for black text */
  black?: boolean;
  /** Flag to add styles for underlined text */
  underlined?: boolean;
  /** Flag to convert children to upper case */
  upper?: boolean;
}

/**
 * Text Component
 *
 * This component renders a React-Native-Elements Text with custom styles
 */
const CustomText = (
  {
    bold,
    light,
    danger,
    underlined,
    children,
    style,
    black,
    upper,
    ...otherProps
  }: Props,
  ref: Ref<Text>,
) => {
  const textStyles: StyleProp<TextStyle> = [
    styles.regularText,
    GeneralStyles.fontSize14,
  ];
  if (bold) {
    textStyles.push(styles.boldText);
  }
  if (danger) {
    textStyles.push(styles.dangerText);
  }
  if (light) {
    textStyles.push(styles.lightText);
  }
  if (black) {
    textStyles.push(styles.black);
  }
  if (underlined) {
    textStyles.push(styles.underlined);
  }
  if (upper) {
    textStyles.push(styles.uppercase);
  }
  if (style) {
    textStyles.push(style);
  }

  return (
    <Text
      h3Style={GeneralStyles.fontSize32}
      style={textStyles}
      allowFontScaling={false}
      ref={ref}
      {...otherProps}>
      {children}
    </Text>
  );
};
export default React.forwardRef(CustomText);
