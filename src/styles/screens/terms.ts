import {StyleSheet} from 'react-native';
import useTheme, {Theme} from '../themes';

const getStyleSheet = ({colors, fonts}: Theme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.primary,
    },
    listContainer: {
      paddingHorizontal: 30,
      paddingVertical: 10,
    },
    itemContainer: {
      paddingVertical: 5,
    },
    title: {
      marginTop: 4,
      fontSize: fonts.size.s16,
      fontFamily: fonts.family.bold,
      color: colors.secondaryAlpha(70),
    },
    subtitle: {
      paddingVertical: 5,
      fontSize: fonts.size.s14,
      fontFamily: fonts.family.regular,
      color: colors.secondaryAlpha(70),
    },
    link: {
      color: colors.blue,
    },
  });
};

export default (props?: any) => {
  const theme = useTheme();
  const styles = getStyleSheet({...props, ...theme});

  return styles;
};
