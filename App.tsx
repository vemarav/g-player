import React from 'react';
import {View, StyleSheet, Linking, StatusBar, Dimensions} from 'react-native';
import Video from 'react-native-video';
import {
  GestureHandlerRootView,
  PanGestureHandler,
  PinchGestureHandler,
} from 'react-native-gesture-handler';

const WINDOW = Dimensions.get('screen');

const App = (): React.ReactChild => {
  const [uri, setUri] = React.useState('No Uri');

  React.useEffect(() => {
    const subscription = Linking.addEventListener(
      'url',
      ({url}: {url: string}) => setUri(url),
    );

    return () => subscription?.remove();
  }, []);

  return (
    <GestureHandlerRootView>
      <StatusBar hidden />
      <PanGestureHandler minPointers={1} maxPointers={1}>
        <PinchGestureHandler minPointers={2}>
          <View style={styles.overlay}>
            <Video
              repeat
              source={require('./assets/video.mp4')}
              resizeMode={'contain'}
              style={styles.video}
              fullscreen
            />
          </View>
        </PinchGestureHandler>
      </PanGestureHandler>
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
