import React from 'react';
import {View, Text, StyleSheet, Linking, Alert} from 'react-native';
import Video from 'react-native-video';

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
    <View style={styles.container}>
      <Text style={styles.title}>{uri}</Text>
      <Video
        repeat
        source={{uri}}
        resizeMode={'contain'}
        style={{width: '100%', height: 300, backgroundColor: '#000000'}}
      />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    color: '#707070',
    margin: 30,
  },
});
