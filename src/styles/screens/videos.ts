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
    video: {
      width: 96,
      height: 64,
      borderRadius: 5,
      backgroundColor: Colors.secondaryAlpha(5),
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
      fontSize: Fonts.size.s15,
      fontFamily: Fonts.family.regular,
      color: Colors.secondaryAlpha(70),
    },
    res: {
      marginTop: 5,
      color: Colors.secondaryAlpha(50),
      fontSize: 12,
      fontWeight: 'bold',
    },
  });
};

export default (props?: any) => {
  const styles = getStyleSheet({...props});
  return styles;
};
