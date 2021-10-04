import { StyleSheet, Dimensions } from 'react-native';

// Assets
import { Colors } from '../../../assets';
import { moderateScale } from 'react-native-size-matters';

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    justifyContent: 'center',
    margin: 0,
    maxHeight: moderateScale(200, 0.3),
    top: Dimensions.get('window').height - moderateScale(200, 0.3),
  },
});
