import {Dimensions, StyleSheet} from 'react-native';
import useTheme, {Theme} from '../themes';
import colors from '../themes/colors';

const {width} = Dimensions.get('screen');

const getStyleSheet = ({colors, fonts}: Theme) => {
  const logoSize = width * 0.8;
  return StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.primary,
    },
    logo: {
      width: logoSize,
      height: logoSize,
    },
    textContainer: {
      bottom: 20,
      width: '100%',
      position: 'absolute',
    },
    text: {
      width: '100%',
      textAlign: 'center',
      color: colors.secondary,
    },
    from: {
      fontSize: fonts.size.s18,
      fontFamily: fonts.family.regular,
    },
    company: {
      marginTop: -5,
      fontSize: fonts.size.s24,
      fontFamily: fonts.family.bold,
    },
  });
};

export default (props?: any) => {
  const theme = useTheme();
  const styles = getStyleSheet({...props, ...theme});

  return {
    ...styles,
    barColor: theme.colors.primary,
    barStyle: theme.colors.barStyle,
    theme: theme.colors.scheme,
  };
};
