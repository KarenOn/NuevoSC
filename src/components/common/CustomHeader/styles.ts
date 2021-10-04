import { StyleSheet } from 'react-native';
import { moderateScale } from 'react-native-size-matters';

export default StyleSheet.create({
  containerStyle: {
    borderBottomWidth: moderateScale(2, 0.3),
    paddingTop: 0,
    paddingBottom: 0,
    height: moderateScale(50, 0.3),
    paddingHorizontal: moderateScale(15, 0.3),
  },
});
