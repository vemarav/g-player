import React, {useState} from 'react';
import {View, StyleSheet, Linking, StatusBar, Dimensions} from 'react-native';
import Video from 'react-native-video';
import {
  GestureHandlerRootView,
  GestureDetector,
  Gesture,
} from 'react-native-gesture-handler';

const WINDOW = Dimensions.get('screen');

const App = (): React.ReactChild => {
  const [isPaused, setPaused] = useState(true);
  const [uri, setUri] = React.useState('No Uri');

  React.useEffect(() => {
    const subscription = Linking.addEventListener(
      'url',
      ({url}: {url: string}) => setUri(url),
    );

    return () => subscription?.remove();
  }, []);

  const doubleTap = Gesture.Tap()
    .numberOfTaps(2)
    .onStart(() => setPaused(!isPaused));

  const pan = Gesture.Pan()
    .maxPointers(1)
    .onBegin(event => {
      console.log('Pan#onBegin', event);
    })
    .onUpdate(event => {
      console.log('Pan#onUpdate');
    })
    .onEnd(event => {
      console.log('Pan#onEnd', event);
    });

  const pinch = Gesture.Pinch()
    .onBegin(event => {
      console.log('Pinch#onBegin', event);
    })
    .onUpdate(event => {
      console.log('Pinch#onUpdate');
    })
    .onEnd(event => {
      console.log('Pinch#onEnd', event);
    });

  const gestures = Gesture.Race(doubleTap, pan, pinch);

  return (
    <GestureHandlerRootView>
      <StatusBar hidden />
      <GestureDetector gesture={gestures}>
        <View style={styles.overlay}>
          <Video
            repeat
            fullscreen
            paused={isPaused}
            source={require('./assets/video.mp4')}
            resizeMode={'contain'}
            style={styles.video}
            onLoad={data => console.log('onload', data)}
          />
        </View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
};

export default App;

const styles = StyleSheet.create({
  video: {
    zIndex: 0,
    width: WINDOW.width,
    height: WINDOW.height,
    backgroundColor: '#000000',
  },
  overlay: {
    zIndex: 1,
  },
});
