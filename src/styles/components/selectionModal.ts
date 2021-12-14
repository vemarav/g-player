import {StyleSheet} from 'react-native';
import {Colors, Fonts} from '../themes';

const getStyleSheet = ({}) => {
  return StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      flex: 1,
      marginTop: 4,
      color: Colors.white,
      marginHorizontal: 10,
      fontSize: Fonts.size.s15,
      fontFamily: Fonts.family.regular,
    },
    listContainer: {
      borderRadius: 8,
      backgroundColor: Colors.blackAlpha(90),
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
      color: Colors.white,
      fontSize: Fonts.size.s22,
      fontFamily: Fonts.family.semiBold,
      letterSpacing: -0.5,
    },
  });
};

export default (props?: any) => {
  const styles = getStyleSheet({...props});
  return {
    ...styles,
    checkbox: {
      true: Colors.white,
      false: Colors.white,
    },
  };
};
