import { StyleSheet } from 'react-native';
import { moderateScale } from 'react-native-size-matters';

export default StyleSheet.create({
  containerStyle: {
    padding: moderateScale(15, 0.3),
    borderRadius: moderateScale(4, 0.3),
    borderWidth: moderateScale(2, 0.3),
  },
  primaryContainer: {
    backgroundColor: '#cce5ff',
    borderColor: '#b8daff',
  },
  primaryText: {
    color: '#004085',
  },
  dangerContainer: {
    backgroundColor: '#f8d7da',
    borderColor: '#f5c6cb',
  },
  dangerText: {
    color: '#721c24',
  },
});
