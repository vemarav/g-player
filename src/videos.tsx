import React, {useEffect, useState} from 'react';
import {StatusBar, View, Platform, StyleSheet, Text} from 'react-native';
import CameraRoll, {Album, GetAlbumsParams} from '@react-native-community/cameraroll';
import {hasPermissionAndroid} from './utils';
import Colors from './colors';

const Videos = (props: any) => {
  const [albums, setAlbums] = useState<Array<Album>>([]);

  useEffect(() => {
    (async () => {
      if (Platform.OS === 'android' && (await hasPermissionAndroid())) {
        const folderOptions: GetAlbumsParams = {assetType: 'Videos'};
        const folders: Array<Album> = await CameraRoll.getAlbums(folderOptions);
        setAlbums(folders);
      }
    })();
  });

  return (
    <View style={styles.container}>
      <StatusBar hidden={false} />
      {albums.map((album: Album) => (
        <Text key={album.title} style={styles.text}>
          {album.title} : {album.count}
        </Text>
      ))}
    </View>
  );
};

export default Videos;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
  },
  text: {
    color: Colors.black,
    fontSize: 18,

    paddingVertical: 10,
  },
});
