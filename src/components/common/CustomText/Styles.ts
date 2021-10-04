import { StyleSheet } from 'react-native';
import { Colors } from '../../../assets/';

export default StyleSheet.create({
  regularText: {
    color: Colors.white,
  },
  lightText: {
    color: Colors.mediumWhite,
  },
  black: {
    color: Colors.black,
  },
  boldText: {
    fontWeight: 'bold',
  },
  dangerText: {
    color: Colors.danger,
  },
  underlined: {
    textDecorationLine: 'underline',
  },
  uppercase: {
    textTransform: 'uppercase',
  },
});
