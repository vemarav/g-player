import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const App = (): React.ReactChild => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}></Text>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 40,
    color: 'black',
  },
});
