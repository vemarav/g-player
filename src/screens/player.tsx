import React, {useState, useEffect, useRef} from 'react';
import {View, StatusBar, ActivityIndicator, Alert} from 'react-native';
import {TouchableOpacity, Dimensions, Text} from 'react-native';
import Video from 'react-native-video';
import {GestureHandlerRootView, GestureDetector, Gesture} from 'react-native-gesture-handler';
import Slider from '@react-native-community/slider';
import Animated, {call, useCode, useValue, withTiming} from 'react-native-reanimated';
import {useSharedValue, useDerivedValue, useAnimatedStyle} from 'react-native-reanimated';
import SystemSetting from 'react-native-system-setting';
import Orientation from 'react-native-orientation-locker';

import {encoder, getTime, getTimeInSeconds, getValue} from '../common/utils';
import ReText from '../components/retext';
import Colors from '../styles/themes/colors';
import Icons from '../../assets/icons';
import SelectionModal, {SelectionModalProps} from '../components/selectionModal';
import applyStyles from '../styles/screens/player';

interface Info {
  [key: string]: any;
  duration: number;
  textTracks?: Array<any>;
  audioTracks?: Array<any>;
  naturalSize?: {width: number; height: number};
}

interface Track {
  type: 'system' | 'disabled' | 'title' | 'language' | 'index';
  value?: string | number | undefined;
}

enum Swipe {
  HORIZONTAL = 2,
  VERTICAL = 4,
}

enum VideoOrientation {
  PORTRAIT = 'P',
  LANDSCAPE = 'L',
}

enum ModalType {
  NONE = 'none',
  AUDIO = 'audio',
  SUBTITLE = 'subtitle',
  PLAYBACK_SPEED = 'playbackSpeed',
}

const AnimatedVideo = Animated.createAnimatedComponent(Video);
const AnimatedSlider = Animated.createAnimatedComponent(Slider);
const WINDOW = Dimensions.get('window');

const MAX_ZOOM = 6;
const MIN_ZOOM = 0.3;

const Player = (props: any) => {
  const timer = useRef<number>(0);
  const fileUri = props.route.params?.uri;
  const contentUri = `content://${props.route.path}`;
  const videoUri = encoder(fileUri ?? contentUri);
  let modalProps: SelectionModalProps = {isVisible: false};
  const styles = applyStyles();

  const videoRef: React.Ref<Video> = useRef(null);
  const before = useSharedValue({
    scale: 1,
    volume: 0,
    brightness: 0,
    translate: {x: 0, y: 0},
    transition: {x: 0, y: 0, updated: false},
  });
  const scale = useSharedValue(1);
  const volume = useSharedValue(0);
  const watchTime = useSharedValue(0);
  const totalTime = useSharedValue(0);
  const brightness = useSharedValue(0);
  const progress: Animated.Value<number> = useValue(0);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const pTransition = useSharedValue({x: 0, y: 0});
  const zoomText = useDerivedValue(() => `${Math.round(scale.value * 100)}%`);
  const volumeText = useDerivedValue(() => `${Math.round(volume.value * 30)}`);
  const brightnessText = useDerivedValue(() => `${Math.round(brightness.value * 30)}`);

  const [uri, setUri] = useState<string>(videoUri);
  const [isZoom, setIsZoom] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [swipe, setSwipe] = useState<Swipe>();
  const [isPaused, setPaused] = useState(false);
  const [isVolume, setIsVolume] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [isControls, setControls] = useState(false);
  const [info, setInfo] = useState<Info>({duration: 0});
  const [isBrightness, setIsBrightness] = useState(false);
  const [watchTimeText, setWatchTimeText] = useState(getTime(0));
  const [dimensions, setDimensions] = useState(Dimensions.get('screen'));
  const [videoOrientation, setVideoOrientation] = useState(VideoOrientation.LANDSCAPE);

  // tracks
  const [selectedTextTrack, setSelectedTextTrack] = useState<any>();
  const [selectedAudioTrack, setSelectedAudioTrack] = useState<any>();
  const [selectedPlaybackSpeed, setPlaybackSpeed] = useState<any>({title: 1});

  // modals
  const [modalType, setModalType] = useState<ModalType>(ModalType.NONE);

  const videoStyles = useAnimatedStyle(() => ({
    transform: [
      {scale: scale.value},
      {translateX: translateX.value},
      {translateY: translateY.value},
    ],
  }));

  useCode(() => {
    return call([progress], (progress: any) => {
      watchTime.value = progress * totalTime.value;
      setWatchTimeText(getTime(watchTime.value));
    });
  }, [progress]);

  useEffect(() => {
    setLoading(true);
    const dimensionSub = Dimensions.addEventListener('change', ({screen}) => {
      setDimensions(screen);
    });

    (async () => {
      volume.value = await SystemSetting.getVolume('music');
      brightness.value = await SystemSetting.getAppBrightness();
    })();

    return () => {
      dimensionSub?.remove();
      Orientation.lockToPortrait();
      Orientation.getAutoRotateState(state => {
        if (state) Orientation.unlockAllOrientations();
      });
    };
  }, []);

  useEffect(() => {
    if (info.duration) totalTime.value = info.duration;
    if (info.audioTracks) setSelectedAudioTrack(info.audioTracks[0]);
  }, [info]);

  useEffect(() => {
    videoOrientation === VideoOrientation.LANDSCAPE
      ? Orientation.lockToLandscape()
      : Orientation.lockToPortrait();
  }, [videoOrientation]);

  useEffect(() => {
    if (modalType !== ModalType.NONE) {
    }
  }, [modalType]);

  useEffect(() => {
    if (!isPaused) {
      translateX.value = withTiming(0, {duration: 250});
      translateY.value = withTiming(0, {duration: 250});
      scale.value = withTiming(zoom, {duration: 250});
    } else {
      setZoom(scale.value);
    }
  }, [isPaused]);

  const toggleOrientation = () => {
    setVideoOrientation(
      videoOrientation === VideoOrientation.LANDSCAPE
        ? VideoOrientation.PORTRAIT
        : VideoOrientation.LANDSCAPE,
    );
  };

  const seekTo = (seconds: number, precision?: number) => {
    videoRef.current?.seek(seconds, precision ?? 50);
  };

  const tap = Gesture.Tap()
    .numberOfTaps(1)
    .onStart(() => setControls(!isControls));

  const doubleTap = Gesture.Tap()
    .numberOfTaps(2)
    .onStart(() => setPaused(!isPaused));

  const pan = Gesture.Pan()
    .activeOffsetX([0, 20])
    .activeOffsetY([0, 20])
    .maxPointers(1)
    .onBegin(({x, y}) => {
      setSwipe(undefined);
      setIsVolume(false);
      setIsBrightness(false);
      before.value.translate = {x, y};
      before.value.volume = volume.value;
      before.value.brightness = brightness.value;
    })
    .onUpdate(({x, y}) => {
      switch (swipe) {
        case Swipe.HORIZONTAL: {
          const dx = x - before.value.translate.x;
          const change = watchTime.value + dx / 5;
          const seek = change < 0 ? 0 : change > totalTime.value ? totalTime.value : change;
          setWatchTimeText(getTime(seek));
          seekTo(seek);
        }
        case Swipe.VERTICAL: {
          const dy = before.value.translate.y - y - 30;
          const change = Number((dy / dimensions.height).toPrecision(2));
          if (isVolume) {
            const _volume = before.value.volume + change;
            volume.value = _volume > 1 ? 1 : _volume < 0 ? 0 : _volume;
            SystemSetting.setVolume(volume.value);
          } else if (isBrightness) {
            const _brightness = before.value.brightness + change;
            brightness.value = _brightness > 1 ? 1 : _brightness < 0 ? 0 : _brightness;
            SystemSetting.setAppBrightness(brightness.value);
          }
          break;
        }
        default: {
          const dx = Math.abs(before.value.translate.x - x);
          const dy = Math.abs(before.value.translate.y - y);
          if (dx > 30 && dy < 30) setSwipe(Swipe.HORIZONTAL);
          if (dy > 30 && dx < 30) {
            setSwipe(Swipe.VERTICAL);
            x > dimensions.width / 2 ? setIsVolume(true) : setIsBrightness(true);
          }
        }
      }
    })
    .onEnd(() => {
      const currentTime = getTimeInSeconds(watchTimeText);
      if (totalTime.value) progress.setValue(currentTime / totalTime.value);
      setSwipe(undefined);
      setIsVolume(false);
      setIsBrightness(false);
    });

  const pinch = Gesture.Pinch()
    .onBegin(() => {
      before.value = {
        ...before.value,
        scale: getValue(scale),
        transition: {...before.value.transition, updated: false},
      };
      pTransition.value = {x: translateX.value, y: translateY.value};
    })
    .onUpdate(event => {
      if (before.value.transition.updated && isPaused) {
        translateX.value = pTransition.value.x + (event.focalX - before.value.transition.x);
        translateY.value = pTransition.value.y + (event.focalY - before.value.transition.y);
      } else {
        before.value = {
          ...before.value,
          transition: {x: event.focalX, y: event.focalY, updated: true},
        };
      }
      if (!isZoom) setIsZoom(true);
      const _scale = before.value.scale + event.scale - 1;
      if (_scale > MAX_ZOOM) scale.value = 6;
      else if (_scale < MIN_ZOOM) scale.value = 0.5;
      else scale.value = _scale;
    })
    .onEnd(() => setIsZoom(false));

  const updateSliderProgress = ({currentTime}: {currentTime: number}) => {
    const played = currentTime / totalTime.value;
    progress.setValue(isNaN(played) || !isFinite(played) ? 0 : played);
  };

  const onSliding = (value: number) => {
    progress.setValue(value);
    seekTo(value * totalTime.value);
  };

  const onSlidingStart = () => setPaused(true);
  const onSlidingEnd = () => setTimeout(() => setPaused(false), 50);

  const onError = () => {
    if (uri !== encoder(uri)) return setUri(encoder(uri));
    const goBack = () => props.navigation.goBack();
    Alert.alert(
      '',
      'Cannot play this video.',
      [
        {
          text: 'OK',
          onPress: goBack,
        },
      ],
      {onDismiss: goBack},
    );
  };

  const gestures = Gesture.Race(doubleTap, pan, pinch, tap);
  const size = {width: dimensions.width, height: dimensions.height};
  const bottomHeight = Math.max(size.height, size.width) - Math.max(WINDOW.height, WINDOW.width);
  const bottom =
    videoOrientation === VideoOrientation.LANDSCAPE
      ? {paddingBottom: 20}
      : {paddingBottom: bottomHeight};

  switch (modalType) {
    case ModalType.SUBTITLE:
      modalProps = {
        title: 'Subtitle',
        selected: selectedTextTrack,
        data: info.textTracks,
        isVisible: true,
        width: dimensions.width,
        height: dimensions.height,
        onSelect: setSelectedTextTrack,
      };
      break;
    case ModalType.AUDIO:
      modalProps = {
        title: 'Audio',
        selected: selectedAudioTrack,
        data: info.audioTracks,
        isVisible: true,
        width: dimensions.width,
        height: dimensions.height,
        onSelect: setSelectedAudioTrack,
      };
      break;
    case ModalType.PLAYBACK_SPEED:
      modalProps = {
        title: 'Playback Speed',
        selected: selectedPlaybackSpeed,
        data: [{title: 0.5}, {title: 0.75}, {title: 1}, {title: 1.5}, {title: 1.75}, {title: 2}],
        isVisible: true,
        width: dimensions.width,
        height: dimensions.height,
        onSelect: setPlaybackSpeed,
      };
      break;
    default:
      modalProps = {isVisible: false};
  }

  const textTrack: Track = selectedTextTrack
    ? {type: 'index', value: selectedTextTrack.index}
    : {type: 'disabled'};

  const audioTrack: Track = selectedAudioTrack
    ? {type: 'index', value: selectedAudioTrack.index}
    : {type: 'disabled'};

  const Status = () => {
    switch (true) {
      case swipe === Swipe.HORIZONTAL:
        return (
          <View style={[styles.iconContainer, styles.seekText]}>
            <Text style={[styles.text, styles.displayText]}>{watchTimeText}</Text>
          </View>
        );
      case isZoom:
        return (
          <View style={[styles.iconContainer, styles.seekText]}>
            <ReText text={zoomText} style={[styles.text, styles.displayText]} />
          </View>
        );
      case isVolume:
        return (
          <View style={styles.iconContainer}>
            <Icons.VolumeUp {...styles.icon} />
            <ReText text={volumeText} style={[styles.text, styles.textWidth]} />
          </View>
        );
      case isBrightness:
        return (
          <View style={styles.iconContainer}>
            <Icons.Brightness {...styles.icon} />
            <ReText text={brightnessText} style={[styles.text, styles.textWidth]} />
          </View>
        );
      case isLoading:
        return (
          <View style={styles.iconContainer}>
            <ActivityIndicator size={styles.icon.width} color={Colors.secondary} />
          </View>
        );
      case isPaused && isControls:
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
          <View style={styles.background}>
            <AnimatedVideo
              source={{uri}}
              ref={videoRef}
              onLoad={setInfo}
              paused={isPaused}
              onError={onError}
              useTextureView={false}
              resizeMode={'contain'}
              fullscreen={!isControls}
              selectedTextTrack={textTrack}
              selectedAudioTrack={audioTrack}
              onEnd={props.navigation.goBack}
              onProgress={updateSliderProgress}
              progressUpdateInterval={500}
              rate={selectedPlaybackSpeed.title}
              onReadyForDisplay={() => setLoading(false)}
              style={[styles.video, size, videoStyles]}
            />
            <View style={[styles.iconHolder, size]}>
              <Status />
            </View>
          </View>
        </GestureDetector>

        {isControls && !isLoading ? (
          <>
            <View style={[styles.trackIcons]}>
              <TouchableOpacity
                style={[styles.controlIcon, styles.resetControlIcon]}
                onPress={() => setModalType(ModalType.PLAYBACK_SPEED)}>
                <Text style={[styles.controlIconSize, styles.controlText]}>
                  {selectedPlaybackSpeed.title}X
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.controlIcon}
                onPress={() => setModalType(ModalType.SUBTITLE)}>
                <Icons.Subtitles {...styles.controlIconSize} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.controlIcon}
                onPress={() => setModalType(ModalType.AUDIO)}>
                <Icons.Audio {...styles.controlIconSize} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.controlIcon} onPress={toggleOrientation}>
                <Icons.ScreenRotation {...styles.controlIconSize} />
              </TouchableOpacity>
            </View>

            <View style={[styles.sliderContainer, bottom]}>
              <Text style={styles.timeText}>{watchTimeText}</Text>
              <AnimatedSlider
                value={progress}
                style={styles.slider}
                thumbTintColor={styles.thumbTintColor}
                minimumTrackTintColor={styles.minimumTrackTintColor}
                maximumTrackTintColor={styles.maximumTrackTintColor}
                onSlidingStart={onSlidingStart}
                onSlidingComplete={onSlidingEnd}
                onValueChange={onSliding}
              />
              <Text style={styles.timeText}>{getTime(totalTime.value)}</Text>
            </View>
          </>
        ) : null}
      </GestureHandlerRootView>

      <SelectionModal {...modalProps} onCancel={() => setModalType(ModalType.NONE)} />
    </>
  );
};

export default Player;
