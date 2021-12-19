import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import FastImage from 'react-native-fast-image';
import Animated, {withTiming, useSharedValue, useAnimatedStyle} from 'react-native-reanimated';

import {Routes, ScreenProps} from '../navigation';
import Icons from '../../assets/icons';
import useStyles from '../styles/screens/splash';

const Splash = (props: ScreenProps<any>) => {
  const animation = useSharedValue(0.3);
  const styles = useStyles();

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{scale: animation.value}, {rotate: `${animation.value * 45 - 45}deg`}],
  }));

  const navigateTo = (route: string) => {
    setTimeout(() => props.navigation.replace(route), 1000);
  };

  useEffect(() => {
    animation.value = withTiming(1, {duration: 750});
    navigateTo(Routes.Folders);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.container, animatedStyle]}>
        <FastImage source={Icons.Logo} style={styles.logo} />
      </Animated.View>
      <View style={styles.textContainer}>
        <Text style={[styles.from, styles.text]}>from</Text>
        <Text style={[styles.company, styles.text]}>Gargantua Exploration Co.</Text>
      </View>
    </View>
  );
};

export default Splash;
