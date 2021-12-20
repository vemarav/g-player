import {StatusBar, StyleSheet} from 'react-native';
import useTheme, {Theme} from '../themes';

interface Styles extends Theme {
  videoOrientation: any;
}

const getStyleSheet = ({colors, fonts, videoOrientation}: Styles) => {
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
      width: '100%',
      paddingBottom: 5,
      paddingHorizontal: 20,
      position: 'absolute',
      justifyContent: 'space-between',
      backgroundColor: colors.blackAlpha(50),
      paddingTop: StatusBar.currentHeight ?? 0,
      flexDirection: videoOrientation === 'L' ? 'row' : 'column',
      alignItems: videoOrientation === 'L' ? 'center' : undefined,
    },
    titleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    name: {
      marginLeft: 10,
      color: colors.white,
      fontSize: fonts.size.s16,
      fontFamily: fonts.family.regular,
    },
    headerIcons: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    headerIconContainer: {
      paddingHorizontal: videoOrientation === 'L' ? 10 : 5,
      paddingVertical: videoOrientation === 'L' ? 10 : 20,
    },
    headerIcon: {
      width: 26,
      height: 26,
      color: colors.white,
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
