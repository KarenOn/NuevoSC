import { StyleSheet, Platform } from 'react-native';
import { moderateScale } from 'react-native-size-matters';

// Assets
import { Colors } from '../../../assets';

export default StyleSheet.create({
  modalContainer: {
    backgroundColor: Colors.gradientPrimary,
    maxWidth: moderateScale(400, 0.3),
  },
  listItem: {
    paddingVertical: moderateScale(5, 0.3),
    borderBottomColor: Colors.mediumWhite,
    borderBottomWidth: moderateScale(2, 0.3),
  },
  flagStyle: {
    position: 'absolute',
    bottom: 0,
    left: moderateScale(-2, 0.3),
    zIndex: 100,
  },
  input: {
    paddingLeft: Platform.select({
      ios: moderateScale(40, 0.3),
      android: moderateScale(48, 0.3),
    }),
  },
});
