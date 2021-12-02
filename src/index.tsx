import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Linking,
  StatusBar,
  Dimensions,
  Text,
} from 'react-native';
import Video from 'react-native-video';
import {
  GestureHandlerRootView,
  GestureDetector,
  Gesture,
} from 'react-native-gesture-handler';
import Slider from '@react-native-community/slider';
import {useSharedValue} from 'react-native-reanimated';
import SystemSetting from 'react-native-system-setting';

import Colors from './colors';
import Icons from '../assets/icons';

const Player = () => {
  const [dimensions, setDimensions] = useState(Dimensions.get('screen'));
  const [isPaused, setPaused] = useState(false);
  const [isVolume, setVolume] = useState(false);
  const [isBrightness, setBrightness] = useState(false);
  const [isControls, setControls] = useState(false);
  const [uri, setUri] = React.useState('No Uri');
  const tapTimer: any = {timeoutId: 0};

  const position = useSharedValue(0);

  useEffect(() => {
    const linkingSub = Linking.addEventListener('url', ({url}) => setUri(url));

    const dimensionSub = Dimensions.addEventListener('change', ({screen}) => {
      setDimensions(screen);
    });

    return () => {
      dimensionSub?.remove();
      linkingSub?.remove();
    };
  });

  const tap = Gesture.Tap()
    .numberOfTaps(1)
    .onStart(() => {
      tapTimer.timeoutId = setTimeout(() => setControls(!isControls), 0);
    });

  const doubleTap = Gesture.Tap()
    .numberOfTaps(2)
    .onStart(() => {
      clearTimeout(tapTimer.timeoutId);
      setPaused(!isPaused);
    });

  const pan = Gesture.Pan()
    .maxPointers(1)
    .onBegin(event => {
      // console.log('Pan#onBegin', event);
    })
    .onUpdate(event => {
      // console.log('Pan#onUpdate');
    })
    .onEnd(event => {
      // console.log('Pan#onEnd', event);
    });

  const pinch = Gesture.Pinch()
    .onBegin(event => {
      // console.log('Pinch#onBegin', event);
    })
    .onUpdate(event => {
      // console.log('Pinch#onUpdate');
    })
    .onEnd(event => {
      // console.log('Pinch#onEnd', event);
    });

  const gestures = Gesture.Race(doubleTap, pan, pinch, tap);
  const size = {width: dimensions.width, height: dimensions.height};

  return (
    <>
      <StatusBar hidden />
      <GestureHandlerRootView>
        <GestureDetector gesture={gestures}>
          <View style={styles.overlay}>
            <Video
              repeat
              fullscreen
              paused={isPaused}
              source={require('../assets/video.mp4')}
              resizeMode={'contain'}
              style={[styles.video, size]}
              onLoad={data => console.log('onload', data)}
              volume={1}
            />
            <View style={[styles.iconHolder, size]}>
              <View style={styles.iconContainer}>
                <Icons.VolumeMute {...styles.icon} />
                <Text style={styles.volume}>5</Text>
              </View>
            </View>
          </View>
        </GestureDetector>
        <View style={styles.sliderContainer}>
          {isControls ? (
            <Slider
              style={styles.slider}
              thumbTintColor={Colors.white}
              minimumTrackTintColor={Colors.white}
              maximumTrackTintColor={Colors.white}
              thumbImage={Icons.Circle}
              onValueChange={(value: number) => console.log('slider', value)}
            />
          ) : null}
        </View>
      </GestureHandlerRootView>
    </>
  );
};

export default Player;

const styles = StyleSheet.create({
  video: {
    zIndex: 0,
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
    backgroundColor: Colors.black,
    transform: [{scale: 1}],
  },
  overlay: {
    backgroundColor: Colors.black,
  },
  sliderContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingTop: 10,
    paddingBottom: 40,
    // backgroundColor: 'red',
  },
  slider: {
    height: 30,
  },
  iconHolder: {
    position: 'absolute',
    top: 0,
    zIndex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    paddingVertical: 30,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: Colors.blackAlpha(50),
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  icon: {
    width: 48,
    height: 48,
  },
  volume: {
    fontSize: 48,
    fontWeight: 'bold',
    color: Colors.white,
  },
});
