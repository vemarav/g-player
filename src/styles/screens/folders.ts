import {Dimensions, StyleSheet} from 'react-native';
import {Colors, Fonts} from '../themes';

const {width} = Dimensions.get('screen');

const getStyleSheet = ({}) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.primary,
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
      color: Colors.secondaryAlpha(60),
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
      fontSize: Fonts.size.s16,
      fontFamily: Fonts.family.regular,
      color: Colors.secondaryAlpha(70),
    },
    count: {
      marginTop: -4,
      fontSize: Fonts.size.s12,
      fontFamily: Fonts.family.regular,
      color: Colors.secondaryAlpha(30),
    },
  });
};

export default (props?: any) => {
  const styles = getStyleSheet({...props});
  return styles;
};
