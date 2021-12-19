import {StyleSheet} from 'react-native';
import useTheme, {Theme} from '../themes';

const getStyleSheet = ({colors, fonts}: Theme) => {
  return StyleSheet.create({
    background: {
      backgroundColor: colors.black,
    },
    video: {
      zIndex: 0,
      transform: [{scale: 1}],
      backgroundColor: colors.black,
    },
    sliderContainer: {
      bottom: 0,
      width: '100%',
      paddingBottom: 20,
      flexDirection: 'row',
      alignItems: 'center',
      position: 'absolute',
      paddingHorizontal: 10,
      backgroundColor: colors.blackAlpha(50),
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
      backgroundColor: colors.blackAlpha(50),
    },
    icon: {
      width: 48,
      height: 48,
      color: colors.white,
    },
    text: {
      marginLeft: 5,
      color: colors.white,
      letterSpacing: 2,
      fontSize: fonts.size.s48,
      fontWeight: '700',
    },
    displayText: {
      width: 200,
      marginLeft: 0,
      textShadowRadius: 5,
      textShadowColor: colors.blackAlpha(50),
      textShadowOffset: {width: 0, height: 0},
    },
    timeText: {
      width: 60,
      color: colors.white,
      textAlign: 'center',
      fontSize: fonts.size.s14,
      fontFamily: fonts.family.regular,
    },
    textWidth: {
      width: 65,
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
      backgroundColor: colors.blackAlpha(50),
    },
    controlIconSize: {
      width: 30,
      height: 30,
      color: colors.white,
    },
    resetControlIcon: {
      padding: 0,
    },
    controlText: {
      height: 60,
      width: 60,
      paddingTop: 5,
      textAlign: 'center',
      fontSize: fonts.size.s14,
      textAlignVertical: 'center',
      color: colors.white,
      fontFamily: fonts.family.semiBold,
    },
  });
};

export default (props?: any) => {
  const theme = useTheme();
  const styles = getStyleSheet({...props, ...theme});
  return {
    ...styles,
    thumbTintColor: theme.colors.white,
    minimumTrackTintColor: theme.colors.white,
    maximumTrackTintColor: theme.colors.white,
  };
};
