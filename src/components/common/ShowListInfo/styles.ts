import { StyleSheet } from 'react-native';
import { moderateScale } from 'react-native-size-matters';

// Assets
import { Colors } from '../../../assets/';

export default StyleSheet.create({
  overlayTitle: {
    backgroundColor: Colors.gradientPrimary,
    borderTopRightRadius: moderateScale(5, 0.3),
    borderTopLeftRadius: moderateScale(5, 0.3),
  },
  overlayItem: {
    borderBottomWidth: moderateScale(2, 0.3),
    borderBottomColor: Colors.mediumBlack,
    paddingVertical: moderateScale(10, 0.3),
  },
  overlayCloseIcon: {
    position: 'absolute',
    top: moderateScale(-4, 0.3),
    right: moderateScale(14, 0.3),
  },
});
