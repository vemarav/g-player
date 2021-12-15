import {StyleSheet} from 'react-native';
import {Colors, Fonts} from '../themes';

const getStyleSheet = ({}) => {
  return StyleSheet.create({
    background: {
      backgroundColor: Colors.black,
    },
    video: {
      zIndex: 0,
      transform: [{scale: 1}],
      backgroundColor: Colors.black,
    },
    sliderContainer: {
      bottom: 0,
      width: '100%',
      paddingBottom: 20,
      flexDirection: 'row',
      alignItems: 'center',
      position: 'absolute',
      paddingHorizontal: 10,
      backgroundColor: Colors.blackAlpha(50),
    },
    slider: {
      flex: 1,
      height: 40,
    },
    iconHolder: {
      top: 0,
      zIndex: 3,
      position: 'absolute',
      alignItems: 'center',
      justifyContent: 'center',
    },
    iconContainer: {
      width: 200,
      height: 100,
      borderRadius: 10,
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center',
      backgroundColor: Colors.blackAlpha(50),
    },
    icon: {
      width: 48,
      height: 48,
    },
    text: {
      marginTop: 15,
      marginLeft: 5,
      color: Colors.white,
      letterSpacing: -2,
      fontSize: Fonts.size.s48,
      fontFamily: Fonts.family.regular,
    },
    displayText: {
      width: 200,
      marginLeft: 0,
      textShadowRadius: 5,
      textShadowColor: Colors.blackAlpha(50),
      textShadowOffset: {width: 0, height: 0},
    },
    timeText: {
      width: 60,
      color: Colors.white,
      textAlign: 'center',
      fontSize: Fonts.size.s14,
      fontFamily: Fonts.family.regular,
    },
    textWidth: {
      width: 60,
    },
    seekText: {
      marginLeft: 90,
      backgroundColor: 'transparent',
    },
    trackIcons: {
      padding: 20,
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      position: 'absolute',
      justifyContent: 'flex-end',
    },
    controlIcon: {
      padding: 15,
      borderRadius: 5,
      marginHorizontal: 10,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: Colors.blackAlpha(50),
    },
    controlIconSize: {
      width: 30,
      height: 30,
      color: Colors.white,
    },
    resetControlIcon: {
      padding: 0,
    },
    controlText: {
      height: 60,
      width: 60,
      paddingTop: 5,
      textAlign: 'center',
      fontSize: Fonts.size.s14,
      textAlignVertical: 'center',
      color: Colors.white,
      fontFamily: Fonts.family.semiBold,
    },
  });
};

export default (props?: any) => {
  const styles = getStyleSheet({...props});
  return {
    ...styles,
    thumbTintColor: Colors.white,
    minimumTrackTintColor: Colors.white,
    maximumTrackTintColor: Colors.white,
  };
};
