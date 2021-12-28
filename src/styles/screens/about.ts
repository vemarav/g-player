import {Dimensions, StyleSheet} from 'react-native';
import useTheme, {Theme} from '../themes';

const getStyleSheet = ({colors, fonts}: Theme) => {
  const {width} = Dimensions.get('screen');
  const imageSize = 72;
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.primary,
    },
    imageContainer: {
      marginTop: 100,
      alignItems: 'center',
      elevation: 10,
      shadowColor: colors.secondary,
      shadowOpacity: 0.5,
      shadowRadius: 30,
      shadowOffset: {width: 0, height: 0},
      backgroundColor: colors.primary,
      alignSelf: 'center',
      borderRadius: 8,
    },
    image: {
      width: imageSize,
      height: imageSize,
      borderRadius: 8,
    },
    appName: {
      fontSize: fonts.size.s16,
      fontFamily: fonts.family.regular,
      color: colors.secondaryAlpha(70),
      textAlign: 'center',
      marginTop: 20,
    },
    versionName: {
      fontSize: fonts.size.s12,
      fontFamily: fonts.family.regular,
      color: colors.secondaryAlpha(50),
      textAlign: 'center',
    },
    bottom: {
      position: 'absolute',
      bottom: 50,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginHorizontal: 30,
    },
    policy: {
      fontSize: fonts.size.s16,
      fontFamily: fonts.family.regular,
      color: colors.blue,
      textAlign: 'center',
      padding: 10,
    },
    copyright: {
      fontSize: fonts.size.s14,
      fontFamily: fonts.family.regular,
      color: colors.secondaryAlpha(50),
      textAlign: 'center',
      width: width,
      padding: 10,
    },
  });
};

export default (props?: any) => {
  const theme = useTheme();
  const styles = getStyleSheet({...props, ...theme});

  return {...styles, theme: theme.colors.scheme};
};
