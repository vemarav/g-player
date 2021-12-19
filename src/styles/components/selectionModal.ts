import {StyleSheet} from 'react-native';
import useTheme, {Theme} from '../themes';

const getStyleSheet = ({colors, fonts}: Theme) => {
  return StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      flex: 1,
      marginTop: 4,
      color: colors.white,
      marginHorizontal: 10,
      fontSize: fonts.size.s15,
      fontFamily: fonts.family.regular,
    },
    listContainer: {
      borderRadius: 8,
      backgroundColor: colors.blackAlpha(90),
    },
    scrollContainer: {
      padding: 20,
      paddingTop: 10,
    },
    item: {
      padding: 5,
      marginRight: 40,
      flexDirection: 'row',
      alignItems: 'center',
    },
    header: {
      marginTop: 20,
      marginHorizontal: 30,
      color: colors.white,
      fontSize: fonts.size.s22,
      fontFamily: fonts.family.semiBold,
      letterSpacing: -0.5,
    },
  });
};

export default (props?: any) => {
  const theme = useTheme();
  const styles = getStyleSheet({...props, ...theme});
  return {
    ...styles,
    checkbox: {
      true: theme.colors.white,
      false: theme.colors.white,
    },
  };
};
