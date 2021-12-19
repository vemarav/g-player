import {Dimensions, StyleSheet} from 'react-native';
import useTheme, {Theme} from '../themes';

const {width} = Dimensions.get('screen');

const getStyleSheet = ({colors, fonts}: Theme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.primary,
    },
    scrollView: {
      flex: 1,
    },
    scrollViewContainer: {
      paddingVertical: 10,
    },
    icon: {
      width: 48,
      height: 48,
      color: colors.secondaryAlpha(60),
    },
    folder: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 30,
      paddingVertical: 10,
    },
    textContainer: {
      paddingHorizontal: 15,
      marginRight: 30,
    },
    title: {
      marginTop: 4,
      width: width - 75 - 48,
      fontSize: fonts.size.s16,
      fontFamily: fonts.family.regular,
      color: colors.secondaryAlpha(70),
    },
    count: {
      marginTop: -4,
      fontSize: fonts.size.s12,
      fontFamily: fonts.family.regular,
      color: colors.secondaryAlpha(30),
    },
  });
};

export default (props?: any) => {
  const theme = useTheme();
  const styles = getStyleSheet({...props, ...theme});

  return styles;
};
