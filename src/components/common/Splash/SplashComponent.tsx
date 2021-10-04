import React from 'react';
import { View, ActivityIndicator } from 'react-native';

import { GeneralStyles } from '../../../assets/';

const SplashComponent: React.FC = () => (
  <View
    style={[
      GeneralStyles.flex1,
      GeneralStyles.alignCenter,
      GeneralStyles.justifyCenter,
    ]}>
    <ActivityIndicator size="large" color="#0000ff" />
  </View>
);

export default SplashComponent;
