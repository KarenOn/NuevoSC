import { StyleSheet } from 'react-native';
import { moderateScale } from 'react-native-size-matters';

// Assets
import { Colors } from '../../../assets/';

export default StyleSheet.create({
  select: {
    borderWidth: 0,
    paddingHorizontal: 0,
    borderBottomColor: Colors.mediumWhite,
    borderBottomWidth: moderateScale(1, 0.3),
    height: moderateScale(40, 0.3),
    justifyContent: 'center',
  },
  label: {
    marginLeft: moderateScale(-0.5, 0.3),
  },
  modalContainer: {
    backgroundColor: Colors.gradientPrimary,
    maxHeight: moderateScale(300, 0.3),
  },
  listItem: {
    paddingVertical: moderateScale(10, 0.3),
    borderBottomColor: Colors.mediumWhite,
    borderBottomWidth: moderateScale(2, 0.3),
  },
  itemSelected: {
    backgroundColor: Colors.mediumBlack,
  },
});
