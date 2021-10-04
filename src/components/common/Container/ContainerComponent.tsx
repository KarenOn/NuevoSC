import React from 'react';
import { SafeAreaView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

// Assets
import { GeneralStyles, Colors } from '../../../assets/';

interface Props {
  children: JSX.Element;
  withoutSafeAreView?: boolean;
}

const ContainerComponent = ({ children, withoutSafeAreView }: Props) => (
  <LinearGradient
    start={{ x: 0, y: 0.9 }}
    end={{ x: 1, y: 0 }}
    colors={[Colors.gradientSecondary, Colors.gradientPrimary]}
    style={GeneralStyles.flex1}>
    {!withoutSafeAreView ? (
      <SafeAreaView style={GeneralStyles.flex1}>{children}</SafeAreaView>
    ) : (
      <>{children}</>
    )}
  </LinearGradient>
);

export default ContainerComponent;
