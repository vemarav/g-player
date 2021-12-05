import React, {useEffect, useState} from 'react';
import {StatusBar, View, StyleSheet, Dimensions, ActivityIndicator} from 'react-native';
import {Text, ScrollView, TouchableOpacity} from 'react-native';
import CameraRoll, {Album, GetAlbumsParams} from '@react-native-community/cameraroll';

import {hasPermissionAndroid} from './utils';
import Colors from './colors';
import Icons from '../assets/icons';
import Routes from './routes';

const {width} = Dimensions.get('screen');

const Videos = (props: any) => {
  const [isLoading, setLoading] = useState<boolean>(true);
  const [albums, setAlbums] = useState<Array<Album>>([]);

  useEffect(() => {
    setTimeout(() => {
      hasPermissionAndroid().then(granted => {
        if (granted) {
          const folderOptions: GetAlbumsParams = {assetType: 'Videos'};
          CameraRoll.getAlbums(folderOptions).then((folders: Array<Album>) => {
            setAlbums(folders);
            setLoading(false);
          });
        }
      });
    }, 300);
  }, []);

  const navigateTo = (route: string, params: any = {}) => {
    props.navigation.navigate(route, params);
  };

  const getVideoText = (n: number) => (n > 1 ? 'Videos' : 'Video');

  return (
    <View style={styles.container}>
      <StatusBar hidden={false} />
      <View style={styles.border}>
        <Text style={styles.header}>Folders</Text>
      </View>
      {isLoading && (
        <View style={styles.loader}>
          <ActivityIndicator size={'large'} color={Colors.witeAlpha(60)} />
        </View>
      )}
      {!isLoading && (
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContainer}
          showsVerticalScrollIndicator={false}>
          {albums.map((album: Album) => (
            <TouchableOpacity onPress={() => navigateTo(Routes.Videos, album)} key={album.title}>
              <View style={styles.folder}>
                <Icons.Folder {...styles.icon} />
                <View style={styles.textContainer}>
                  <Text style={styles.title}>{album.title}</Text>
                  <Text style={styles.count}>
                    {album.count} {getVideoText(album.count)}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default Videos;

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Colors.black,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.black,
  },
  border: {
    borderBottomWidth: 1,
    borderColor: Colors.witeAlpha(85),
  },
  header: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.white,
    paddingHorizontal: 30,
    paddingVertical: 15,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContainer: {
    paddingVertical: 10,
  },
  icon: {
    color: Colors.witeAlpha(85),
    width: 48,
    height: 48,
  },
  folder: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingVertical: 20,
  },
  textContainer: {
    paddingHorizontal: 15,
    marginRight: 30,
  },
  title: {
    marginTop: 4,
    color: Colors.witeAlpha(80),
    fontSize: 16,
    fontWeight: 'bold',
    width: width - 75 - 48,
  },
  count: {
    marginTop: 2,
    color: Colors.witeAlpha(50),
    fontSize: 12,
    fontWeight: 'bold',
  },
});
