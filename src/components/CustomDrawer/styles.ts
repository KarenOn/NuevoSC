import { StyleSheet } from 'react-native';

// Assets
import { Colors } from '../../assets';
import { moderateScale } from 'react-native-size-matters';

export default StyleSheet.create({
  drawerHeader: {
    height: moderateScale(46, 0.3),
    borderBottomWidth: moderateScale(2, 0.3),
    borderBottomColor: Colors.white,
    marginBottom: moderateScale(4, 0.3),
  },
  drawerItemContainer: {
    paddingHorizontal: moderateScale(10, 0.3),
    left: -10,
    width: '100%',
    borderRadius: 0,
  },
  drawerItemLabel: {
    color: Colors.white,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  separator: { borderBottomColor: 'white', borderBottomWidth: 1 },
  activeColor: {
    backgroundColor: Colors.mediumBlack,
  },
});
