import { StyleSheet } from 'react-native';
import { moderateScale } from 'react-native-size-matters';

// Assets
import { Colors } from './colors';

export default StyleSheet.create({
  flexDot1: {
    flex: 0.1,
  },
  flex1: {
    flex: 1,
  },
  flex7: {
    flex: 7,
  },
  flexRow: {
    flexDirection: 'row',
  },
  flexColumn: {
    flexDirection: 'column',
  },
  alignCenter: {
    alignItems: 'center',
  },
  alignEnd: {
    alignItems: 'flex-end',
  },
  justifyCenter: {
    justifyContent: 'center',
  },
  justifyBetween: {
    justifyContent: 'space-between',
  },
  width100: {
    width: '100%',
  },
  mHeight100: {
    maxHeight: '100%',
  },
  // Margins
  marginV3: {
    marginVertical: moderateScale(3, 0.3),
  },
  marginTLess10: {
    marginTop: moderateScale(-5, 0.3),
  },
  marginTLess15: {
    marginTop: moderateScale(-15, 0.3),
  },
  marginT5: {
    marginTop: moderateScale(5, 0.3),
  },
  marginT15: {
    marginTop: moderateScale(15, 0.3),
  },
  marginT30: {
    marginTop: moderateScale(30, 0.3),
  },
  marginT80: {
    marginTop: moderateScale(80, 0.3),
  },
  marginB10: {
    marginBottom: moderateScale(10, 0.3),
  },
  marginB15: {
    marginBottom: moderateScale(15, 0.3),
  },
  // Paddings
  paddingT10: {
    paddingTop: moderateScale(10, 0.3),
  },
  paddingR10: {
    paddingRight: moderateScale(10, 0.3),
  },
  paddingL10: {
    paddingLeft: moderateScale(10, 0.3),
  },
  paddingL20: {
    paddingLeft: moderateScale(20, 0.3),
  },
  paddingL30: {
    paddingLeft: moderateScale(30, 0.3),
  },
  paddingB5: {
    paddingBottom: moderateScale(5, 0.3),
  },
  paddingB10: {
    paddingBottom: moderateScale(10, 0.3),
  },
  paddingB20: {
    paddingBottom: moderateScale(20, 0.3),
  },
  paddingH0: {
    paddingHorizontal: 0,
  },
  paddingH10: {
    paddingHorizontal: moderateScale(10, 0.3),
  },
  paddingH11: {
    paddingHorizontal: moderateScale(11, 0.3),
  },
  paddingH15: {
    paddingHorizontal: moderateScale(15, 0.3),
  },
  paddingH17: {
    paddingHorizontal: moderateScale(17, 0.3),
  },
  paddingH20: {
    paddingHorizontal: moderateScale(20, 0.3),
  },
  paddingV10: {
    paddingVertical: moderateScale(10, 0.3),
  },
  // Buttons
  defaultButton: {
    height: moderateScale(40, 0.3),
  },
  primaryButton: {
    backgroundColor: Colors.black,
  },
  primaryButtonDisabled: {
    backgroundColor: Colors.mediumBlack,
  },
  secondaryButton: {
    backgroundColor: Colors.btnSecondary,
  },
  secondaryButtonDisabled: {
    backgroundColor: Colors.btnSecondary,
    opacity: 0.65,
  },
  dangerButton: {
    backgroundColor: Colors.btnDanger,
  },
  dangerButtonDisabled: {
    backgroundColor: Colors.btnDanger,
    opacity: 0.65,
  },
  // Inputs
  label: {
    color: Colors.white,
  },
  // Fonts
  fontSize13: {
    fontSize: moderateScale(13, 0.3),
  },
  fontSize14: {
    fontSize: moderateScale(14, 0.3),
  },
  fontSize16: {
    fontSize: moderateScale(16, 0.3),
  },
  fontSize18: {
    fontSize: moderateScale(18, 0.3),
  },
  fontSize20: {
    fontSize: moderateScale(20, 0.3),
  },
  fontSize25: {
    fontSize: moderateScale(25, 0.3),
  },
  fontSize32: {
    fontSize: moderateScale(32, 0.3),
  },
  fontSize35: {
    fontSize: moderateScale(35, 0.3),
  },
  fontBold: {
    fontWeight: 'bold',
  },
  textCenter: {
    textAlign: 'center',
  },
});
