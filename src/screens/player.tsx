import React, {useState, useEffect, useRef, useCallback} from 'react';
import {View, StatusBar, ActivityIndicator, Alert, BackHandler} from 'react-native';
import {TouchableOpacity, Dimensions, Text} from 'react-native';
import Video from 'react-native-video';
import {GestureHandlerRootView, GestureDetector, Gesture} from 'react-native-gesture-handler';
import Slider from '@react-native-community/slider';
import Animated, {call, runOnJS, useCode, useValue, withTiming} from 'react-native-reanimated';
import {
  useSharedValue,
  useDerivedValue,
  useAnimatedStyle,
  useAnimatedProps,
} from 'react-native-reanimated';
import SystemSetting from 'react-native-system-setting';
import Orientation from 'react-native-orientation-locker';
import TextTicker from 'react-native-text-ticker';

import Icons from '../../assets/icons';
import ReText from '../components/retext';
import useStyles from '../styles/screens/player';
import {PLAYBACK_SPEEDS} from '../common/constants';
import {encoder, getTime, getTimeInSeconds} from '../common/utils';
import SelectionModal, {SelectionModalProps} from '../components/selectionModal';
import {ScreenProps} from '../navigation';
import {useAppDispatch, useAppSelector} from '../store/hooks';
import {initialFileState, update} from '../store/slices/resume';
import {setLoop} from '../store/slices/settings';

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
const MIN_ZOOM = 0.1;

const Player = (props: ScreenProps<any>) => {
  const fileUri = props.route.params?.uri;
  const contentUri = `content://${props.route.path}`;
  const videoUri = encoder(fileUri ?? contentUri);
  const fileName = (fileUri ?? contentUri).split('/').pop();
  let modalProps: SelectionModalProps = {isVisible: false};

  const videoRef: React.Ref<Video> = useRef(null);

  const resume = useAppSelector(state => state.resume[videoUri]);
  const isResume = useAppSelector(state => state.settings.playback === 'resume');
  const loop = useAppSelector(state => state.settings.loop);

  const dispatch = useAppDispatch();
  const resumeData = Object.assign(initialFileState, resume);

  // previous values, stores where user left the gesture
  const pScale = useSharedValue(resumeData.scale);
  const pVolume = useSharedValue(resumeData.volume);
  const pBrightness = useSharedValue(resumeData.brightness);
  const pTranslate = useSharedValue({x: 0, y: 0}); // used in pan tracking
  const pTransition = useSharedValue({x: 0, y: 0});
  const pFocals = useSharedValue({x: 0, y: 0, updated: false});

  // active values used in animations
  const scale = useSharedValue(pScale.value);
  const volume = useSharedValue(pVolume.value);
  const watchTime = useSharedValue(0);
  const totalTime = useSharedValue(0);
  const brightness = useSharedValue(pBrightness.value);
  const translateX = useSharedValue(pTransition.value.x);
  const translateY = useSharedValue(pTransition.value.y);
  const progress: Animated.Value<number> = useValue(0);
  const zoomText = useDerivedValue(() => `${Math.round(scale.value * 100)}%`);
  const volumeText = useDerivedValue(() => `${Math.round(volume.value * 50)}`);
  const brightnessText = useDerivedValue(() => `${Math.round(brightness.value * 50)}`);

  const [swipe, setSwipe] = useState<Swipe>();
  const [zoom, setZoom] = useState(scale.value);
  const [isZoom, setIsZoom] = useState(false);
  const [isPaused, setPaused] = useState(false);
  const [isVolume, setIsVolume] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [uri, setUri] = useState<string>(videoUri);
  const [isControls, setControls] = useState(false);
  const [info, setInfo] = useState<Info>({duration: 0});
  const [isBrightness, setIsBrightness] = useState(false);
  const [watchTimeText, setWatchTimeText] = useState(getTime(0));
  const [dimensions, setDimensions] = useState(Dimensions.get('screen'));
  const [videoOrientation, setVideoOrientation] = useState(VideoOrientation.LANDSCAPE);
  const styles = useStyles({videoOrientation});

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

  const purgeResume = useCallback(() => {
    dispatch(
      update({
        scale: scale.value,
        filename: videoUri,
        volume: volume.value,
        brightness: brightness.value,
        playedDuration: totalTime.value - watchTime.value < 3 ? 0 : watchTime.value,
      }),
    );
  }, []);

  useAnimatedProps(() => {
    'worklet';
    runOnJS(SystemSetting.setVolume)(volume.value);
    return volume;
  }, [volume]);

  useAnimatedProps(() => {
    'worklet';
    runOnJS(SystemSetting.setAppBrightness)(brightness.value);
    return brightness;
  }, [brightness]);

  useCode(() => {
    return call([progress], (progress: any) => {
      watchTime.value = progress * totalTime.value;
      setWatchTimeText(getTime(watchTime.value));
    });
  }, [progress]);

  useEffect(() => {
    setLoading(true);
    const dimensionSub = Dimensions.addEventListener('change', ({screen}) => setDimensions(screen));
    if (isResume) seekTo(resumeData.playedDuration);

    return () => {
      SystemSetting.getBrightness().then(SystemSetting.setAppBrightness);
      purgeResume();
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
    if (!isPaused) {
      translateX.value = withTiming(0, {duration: 250});
      translateY.value = withTiming(0, {duration: 250});
      scale.value = withTiming(zoom, {duration: 250});
    } else {
      setZoom(scale.value);
    }
  }, [isPaused]);

  useEffect(() => purgeResume(), [watchTime.value]);

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

  const goBack = () => {
    if (props.navigation.canGoBack()) {
      props.navigation.goBack();
    } else {
      BackHandler.exitApp();
    }
  };

  const tap = Gesture.Tap()
    .numberOfTaps(1)
    .onStart(() => setControls(!isControls));

  const doubleTap = Gesture.Tap()
    .numberOfTaps(2)
    .onStart(() => setPaused(!isPaused));

  const pan = Gesture.Pan()
    .maxPointers(1)
    .onBegin(({x, y}) => {
      setSwipe(undefined);
      setIsVolume(false);
      setIsBrightness(false);
      pTranslate.value.x = x;
      pTranslate.value.y = y;
      pVolume.value = volume.value;
      pBrightness.value = brightness.value;
    })
    .onUpdate(({x, y}) => {
      switch (swipe) {
        case Swipe.HORIZONTAL: {
          const dx = x - pTranslate.value.x;
          const change = watchTime.value + dx / 10;
          const seek = change < 0 ? 0 : change > totalTime.value ? totalTime.value : change;
          setWatchTimeText(getTime(seek));
          seekTo(seek);
        }
        case Swipe.VERTICAL: {
          const dy = pTranslate.value.y - y - 30;
          const change = Number((dy / dimensions.height).toPrecision(2));
          if (isVolume) {
            const _volume = pVolume.value + change;
            volume.value = _volume > 1 ? 1 : _volume < 0 ? 0 : _volume;
          } else if (isBrightness) {
            const _brightness = pBrightness.value + change;
            brightness.value = _brightness > 1 ? 1 : _brightness < 0 ? 0 : _brightness;
          }
          break;
        }
        default: {
          const dx = Math.abs(pTranslate.value.x - x);
          const dy = Math.abs(pTranslate.value.y - y);
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
      pScale.value = scale.value;
      pFocals.value.updated = false;
      pTransition.value = {x: translateX.value, y: translateY.value};
    })
    .onUpdate(event => {
      if (isPaused) {
        if (pFocals.value.updated) {
          translateX.value = pTransition.value.x + (event.focalX - pFocals.value.x);
          translateY.value = pTransition.value.y + (event.focalY - pFocals.value.y);
        } else {
          pFocals.value.x = event.focalX;
          pFocals.value.y = event.focalY;
          pFocals.value.updated = true;
        }
      }

      if (!isZoom) setIsZoom(true);
      const _scale = pScale.value + event.scale - 1;
      if (_scale > MAX_ZOOM) scale.value = 6;
      else if (_scale < MIN_ZOOM) scale.value = 0.1;
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

  const onVideoEnd = () => goBack();

  const gestures = Gesture.Exclusive(pan, pinch, doubleTap, tap);
  const size = {width: dimensions.width, height: dimensions.height};
  const bottomHeight = Math.max(size.height, size.width) - Math.max(WINDOW.height, WINDOW.width);
  const bottom =
    videoOrientation === VideoOrientation.LANDSCAPE
      ? {paddingBottom: 20}
      : {paddingBottom: bottomHeight};

  switch (modalType) {
    case ModalType.SUBTITLE:
      modalProps = {
        isVisible: true,
        title: 'Subtitle',
        data: info.textTracks,
        width: dimensions.width,
        height: dimensions.height,
        selected: selectedTextTrack,
        onSelect: setSelectedTextTrack,
      };
      break;
    case ModalType.AUDIO:
      modalProps = {
        title: 'Audio',
        isVisible: true,
        data: info.audioTracks,
        width: dimensions.width,
        height: dimensions.height,
        selected: selectedAudioTrack,
        onSelect: setSelectedAudioTrack,
      };
      break;
    case ModalType.PLAYBACK_SPEED:
      modalProps = {
        isVisible: true,
        data: PLAYBACK_SPEEDS,
        title: 'Playback Speed',
        width: dimensions.width,
        height: dimensions.height,
        onSelect: setPlaybackSpeed,
        selected: selectedPlaybackSpeed,
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
            <ActivityIndicator size={styles.icon.width} color={styles.icon.color} />
          </View>
        );
      case isPaused && isControls:
        return (
          <View>
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
            <View style={[styles.iconHolder, size]}>
              <Status />
            </View>
            <AnimatedVideo
              repeat={loop}
              source={{uri}}
              ref={videoRef}
              onLoad={setInfo}
              fullscreen={true}
              onError={onError}
              useTextureView={true}
              resizeMode={'contain'}
              progressUpdateInterval={500}
              selectedTextTrack={textTrack}
              selectedAudioTrack={audioTrack}
              onProgress={updateSliderProgress}
              rate={selectedPlaybackSpeed.title}
              onEnd={loop ? undefined : onVideoEnd}
              style={[styles.video, size, videoStyles]}
              onReadyForDisplay={() => setLoading(false)}
              paused={swipe === Swipe.HORIZONTAL || isPaused}
            />
          </View>
        </GestureDetector>
      </GestureHandlerRootView>

      {isControls && !isLoading ? (
        <>
          <View style={styles.trackIcons}>
            <View>
              <TouchableOpacity
                style={[styles.titleContainer, {width: size.width * 0.5}]}
                onPress={goBack}>
                <Icons.Back {...styles.headerIcon} />
                <TextTicker style={styles.name} duration={100 * fileName.length}>
                  {fileName}
                </TextTicker>
              </TouchableOpacity>
            </View>
            <View style={styles.headerIcons}>
              <TouchableOpacity
                style={styles.headerIconContainer}
                onPress={() => dispatch(setLoop(!loop))}>
                <Icons.Loop
                  {...styles.headerIcon}
                  color={loop ? styles.selectedIcon.color : styles.headerIcon.color}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.headerIconContainer}
                onPress={() => setModalType(ModalType.PLAYBACK_SPEED)}>
                <Icons.Speed {...styles.headerIcon} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.headerIconContainer}
                onPress={() => setModalType(ModalType.SUBTITLE)}>
                <Icons.Subtitles {...styles.headerIcon} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.headerIconContainer}
                onPress={() => setModalType(ModalType.AUDIO)}>
                <Icons.Audio {...styles.headerIcon} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.headerIconContainer} onPress={toggleOrientation}>
                <Icons.ScreenRotation {...styles.headerIcon} />
              </TouchableOpacity>
            </View>
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
      <SelectionModal {...modalProps} onCancel={() => setModalType(ModalType.NONE)} />
    </>
  );
};

export default Player;
