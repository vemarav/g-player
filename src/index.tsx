import React, {useState, useEffect, useRef, Dispatch} from 'react';
import {
  View,
  StyleSheet,
  Linking,
  StatusBar,
  Dimensions,
  ViewStyle,
} from 'react-native';
import Video from 'react-native-video';
import {
  GestureHandlerRootView,
  GestureDetector,
  Gesture,
} from 'react-native-gesture-handler';
import Slider from '@react-native-community/slider';
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  useValue,
} from 'react-native-reanimated';
import SystemSetting from 'react-native-system-setting';
import ReText from './retext';

import Colors from './colors';
import Icons from '../assets/icons';
import {getTime, getValue} from './utils';

const abs = Math.abs;

const AnimatedVideo = Animated.createAnimatedComponent(Video);
const AnimatedSlider = Animated.createAnimatedComponent(Slider);

const Player = () => {
  const videoRef: React.Ref<Video> = useRef(null);
  const seekTimer: {timeoutId: any} = {timeoutId: 0};
  const before: {scale: number; translate: {x: number; y: number}} = {
    scale: 1,
    translate: {x: 0, y: 0},
  };

  const scale = useSharedValue(before.scale);
  const translate = useSharedValue(before.translate);
  const percentile = useDerivedValue(() => `${Math.round(scale.value * 100)}%`);
  const progress: Animated.Value<number> = useValue(0);

  const [isPaused, setPaused] = useState(false);
  // const [isVolume, setVolume] = useState(false);
  const [uri, setUri] = React.useState('No Uri');
  const [info, setInfo] = useState({duration: 0});
  const [isZoom, setZoom] = useState(false);
  const [isControls, setControls] = useState(false);
  // const [isBrightness, setBrightness] = useState(false);
  const [dimensions, setDimensions] = useState(Dimensions.get('screen'));

  const videoStyles = useAnimatedStyle<Animated.AnimatedStyleProp<ViewStyle>>(
    () => {
      return {
        transform: [{scale: scale.value}],
      };
    },
  );

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
    .onStart(() => setControls(!isControls));

  const doubleTap = Gesture.Tap()
    .numberOfTaps(2)
    .onStart(() => setPaused(!isPaused));

  const pan = Gesture.Pan()
    .maxPointers(1)
    .onBegin(event => {
      // console.log(event);
    })
    .onUpdate(event => {
      // const {x, y, velocityX, velocityY} = event;
      // const {width} = dimensions;
      // const edgeWidth = width * 0.3;
      // if (x < edgeWidth && abs(velocityY) > abs(velocityX)) {
      //   console.log('left corner', velocityX, velocityY);
      // } else if (x > width - edgeWidth && abs(velocityY) > abs(velocityX)) {
      //   console.log('right corner', velocityX, velocityY);
      // } else {
      //   console.log('forward', abs(velocityX), abs(velocityY));
      // }
    })
    .onEnd(event => {
      // console.log('end', event);
    });

  const pinch = Gesture.Pinch()
    .onBegin(() => (before.scale = getValue(scale)))
    .onUpdate(event => {
      if (!isZoom) setZoom(true);
      const _scale = before.scale + event.scale - 1;
      if (_scale > 1.5) scale.value = 1.5;
      else if (_scale < 0.5) scale.value = 0.5;
      else scale.value = _scale;
    })
    .onEnd(() => setZoom(false));

  const updateSliderProgress = ({currentTime}: {currentTime: number}) => {
    progress.setValue(currentTime / info.duration);
  };

  const onSliding = (value: number) => {
    clearTimeout(seekTimer.timeoutId);
    progress.setValue(value);
    const callback = () => videoRef.current?.seek(value * info.duration, 0);
    seekTimer.timeoutId = setTimeout(callback, 50);
  };

  const onSlidingStart = (value: number) => setPaused(true);
  const onSlidingEnd = (value: number) => setPaused(false);

  const gestures = Gesture.Race(doubleTap, pan, pinch, tap);
  const size = {width: dimensions.width, height: dimensions.height};

  const Status = () => {
    switch (true) {
      case isZoom:
        return (
          <View style={styles.iconContainer}>
            <ReText text={percentile} style={styles.text} />
          </View>
        );
      case isPaused:
        return (
          <View style={styles.iconContainer}>
            <Icons.Pause {...styles.icon} />
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <StatusBar hidden />
      <GestureHandlerRootView>
        <GestureDetector gesture={gestures}>
          <View style={[styles.overlay]}>
            <AnimatedVideo
              repeat
              fullscreen
              ref={videoRef}
              paused={isPaused}
              onLoad={setInfo}
              resizeMode={'contain'}
              onProgress={updateSliderProgress}
              source={require('../assets/video.mp4')}
              style={[styles.video, size, videoStyles]}
            />
            <View style={[styles.iconHolder, size]}>
              <Status />
            </View>
          </View>
        </GestureDetector>
        <View style={styles.sliderContainer}>
          {isControls ? (
            <AnimatedSlider
              value={progress}
              style={styles.slider}
              thumbTintColor={Colors.white}
              minimumTrackTintColor={Colors.white}
              maximumTrackTintColor={Colors.white}
              thumbImage={Icons.Circle}
              onSlidingStart={onSlidingStart}
              onSlidingComplete={onSlidingEnd}
              onValueChange={onSliding}
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
    paddingBottom: 60,
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
    width: 150,
    height: 100,
    borderRadius: 10,
    backgroundColor: Colors.blackAlpha(60),
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  icon: {
    width: 48,
    height: 48,
  },
  text: {
    fontSize: 48,
    fontWeight: 'bold',
    color: Colors.white,
    paddingHorizontal: 5,
  },
});
