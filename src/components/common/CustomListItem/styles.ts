import { StyleSheet } from 'react-native';
import { moderateScale } from 'react-native-size-matters';

// Assets
import { Colors } from '../../../assets/';

export default StyleSheet.create({
  container: {
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
  defaultBG: {
    backgroundColor: Colors.black,
  },
  warningBG: {
    backgroundColor: Colors.danger,
  },
  disabledBG: {
    backgroundColor: Colors.disabled,
  },
  completedBG: {
    backgroundColor: Colors.btnSecondary,
  },
  disabledTextColor: {
    color: Colors.black,
  },
  rightButtonContainer: {
    borderLeftWidth: moderateScale(2, 0.3),
  },
  defaultSeparatorColor: {
    borderLeftColor: Colors.mediumWhite,
  },
  disabledSeparatorColor: {
    borderLeftColor: Colors.black,
  },
  rightButton: {
    height: moderateScale(60, 0.3),
    width: moderateScale(60, 0.3),
  },
});
