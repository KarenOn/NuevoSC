import { StyleSheet } from 'react-native';
import { moderateScale } from 'react-native-size-matters';

// Assets
import { Colors } from '../../../assets';

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.btnSecondary,
    borderRadius: moderateScale(4, 0.3),
    shadowColor: Colors.mediumWhite,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  separator: {
    backgroundColor: Colors.white,
    width: '100%',
    height: moderateScale(2, 0.3),
  },
  buttonsSeparator: {
    width: moderateScale(2, 0.3),
    height: '100%',
    backgroundColor: 'white',
  },
  completedBG: {
    backgroundColor: Colors.btnSecondary,
  },
});
