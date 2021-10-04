import { StyleSheet } from 'react-native';
import { moderateScale } from 'react-native-size-matters';

// Assets
import { Colors } from '../../assets/';

export default StyleSheet.create({
  overlayContainer: {
    backgroundColor: Colors.white,
    padding: 0,
    borderRadius: moderateScale(5, 0.3),
    height: 'auto',
    maxWidth: moderateScale(400, 0.3),
    maxHeight: '90%',
  },
});
