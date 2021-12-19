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
    video: {
      width: 96,
      height: 64,
      borderRadius: 5,
      backgroundColor: colors.secondaryAlpha(5),
    },
    folder: {
      paddingVertical: 10,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 30,
    },
    textContainer: {
      marginRight: 30,
      paddingHorizontal: 15,
    },
    title: {
      letterSpacing: -0.5,
      width: width - 75 - 96,
      fontSize: fonts.size.s15,
      fontFamily: fonts.family.regular,
      color: colors.secondaryAlpha(70),
    },
    res: {
      marginTop: 5,
      color: colors.secondaryAlpha(50),
      fontSize: 12,
      fontWeight: 'bold',
    },
  });
};

export default (props?: any) => {
  const theme = useTheme();
  const styles = getStyleSheet({...props, ...theme});

  return styles;
};
