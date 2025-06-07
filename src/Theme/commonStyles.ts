import { Platform, StyleSheet } from 'react-native';
import { getHeight, getWidth } from './constens';
import Colors from './Colors';

const CommonStyles = StyleSheet.create({
  appTitle: {
    fontSize: getWidth(14),
    fontWeight: '700',
    paddingBottom: 8,
    letterSpacing: 0.5,
    fontFamily: 'Inter',
  },
  titleText: {
    fontSize: getHeight(70),
    fontWeight: '500',
    fontFamily: 'Inter',
    color: Colors.textPrimery
  },
  appNameTitle: {
    fontSize: getHeight(35),
    fontWeight: '700',
    fontFamily: 'Inter',
  },
  subTitle: {
    fontSize: getWidth(28),
    fontWeight: '500',
    textAlign: 'center',
    fontFamily: 'Inter',
  },
  mainContainer: {
    flex: 1,
    padding: getWidth(60)
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerFlex1: {
    flex: 1,

  },
  font45bold: {
    fontSize: getHeight(45),
    fontWeight: '700',
    fontFamily: 'Inter',
  },
  errorText: {
    marginTop: getHeight(190),
  },
  flexRowContainer: { flexDirection: 'row' },
  warningAlert: {
    backgroundColor: '#FFFFFF',
    color: '#000000',
  },
  warningButton: {
    color: '#000000',
  },
  linkTextContainer: {
    alignItems: 'flex-end',
  },
  formContainer: {
    flex: 1,
    paddingBottom: getHeight(Platform.OS === 'ios' ? 7 : 9),
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  font16: {
    fontSize: getHeight(16),
    fontWeight: '400',
    fontFamily: 'Inter',
  },
  formTitle: {
    fontSize: getHeight(45),
    fontFamily: 'Inter',
    fontWeight: Platform.OS === 'ios' ? '600' : '700',
  },
  contentCenter: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  parentContainer: {
    width: getWidth(1.04),
  }
});

export default CommonStyles