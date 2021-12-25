import {StyleSheet} from 'react-native';
import useTheme, {Theme} from '../themes';

const getStyleSheet = ({colors, fonts}: Theme) => {
  return StyleSheet.create({
    border: {
      paddingVertical: 5,
      borderBottomWidth: 3,
      alignItems: 'center',
      flexDirection: 'row',
      paddingHorizontal: 25,
      borderColor: colors.secondaryAlpha(80),
    },
    header: {
      flex: 1,
      marginTop: 3,
      marginHorizontal: 10,
      fontSize: fonts.size.s20,
      color: colors.secondaryAlpha(80),
      fontFamily: fonts.family.regular,
    },
    backIcon: {
      width: 22,
      height: 22,
      color: colors.secondaryAlpha(80),
    },
  });
};

export default (props?: any) => {
  const theme = useTheme();
  const styles = getStyleSheet({...props, ...theme});

  return {...styles, barColor: theme.colors.primary, barStyle: theme.colors.barStyle};
};
