import {StyleSheet} from 'react-native';
import {Colors, Fonts} from '../themes';

const getStyleSheet = ({}) => {
  return StyleSheet.create({
    border: {
      paddingVertical: 5,
      borderBottomWidth: 3,
      alignItems: 'center',
      flexDirection: 'row',
      paddingHorizontal: 25,
      borderColor: Colors.secondaryAlpha(80),
    },
    header: {
      marginTop: 3,
      marginHorizontal: 10,
      fontSize: Fonts.size.s24,
      color: Colors.secondaryAlpha(80),
      fontFamily: Fonts.family.semiBold,
    },
    backIcon: {
      width: 22,
      height: 22,
      color: Colors.secondaryAlpha(80),
    },
  });
};

export default (props?: any) => {
  const styles = getStyleSheet({...props});
  return {...styles, barColor: Colors.primary, barStyle: Colors.barStyle};
};
