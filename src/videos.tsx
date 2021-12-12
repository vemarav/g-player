import React, {useEffect, useState} from 'react';
import {StatusBar, View, StyleSheet, Dimensions} from 'react-native';
import {RefreshControl, AppState} from 'react-native';
import {Text, ScrollView, TouchableOpacity} from 'react-native';
import CameraRoll, {GetPhotosParams, PhotoIdentifier} from '@react-native-community/cameraroll';
import Image from 'react-native-fast-image';

import Colors from './colors';
import Icons from '../assets/icons';
import Routes from './routes';

const {width} = Dimensions.get('screen');

const Videos = (props: any) => {
  const {title, count} = props.route.params;
  const folderOptions: GetPhotosParams = {
    first: count,
    assetType: 'Videos',
    groupName: title,
  };
  const [isLoading, setLoading] = useState<boolean>(false);
  const [videos, setVideos] = useState<Array<PhotoIdentifier>>([]);

  useEffect(() => {
    loadFiles();
    const appStateListener = AppState.addEventListener('focus', loadFiles);

    return () => {
      appStateListener.remove();
    };
  }, []);

  const loadFiles = async () => {
    setLoading(true);
    try {
      setVideos((await CameraRoll.getPhotos(folderOptions)).edges);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const navigateTo = (route: string, params: any = {}) => {
    props.navigation.navigate(route, params);
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden={false} />

      <View style={styles.border}>
        <TouchableOpacity onPress={() => navigateTo(Routes.Folders)}>
          <Icons.Back {...styles.back} />
        </TouchableOpacity>
        <Text style={styles.header} numberOfLines={1}>
          {title}
        </Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContainer}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={isLoading} onRefresh={loadFiles} />}>
        {videos.map((video: PhotoIdentifier) => {
          const {uri} = video.node.image;
          return (
            <TouchableOpacity onPress={() => navigateTo(Routes.Player, {uri})} key={uri}>
              <View style={styles.folder}>
                <Image source={{uri}} style={styles.video} />
                <View style={styles.textContainer}>
                  <Text style={styles.title}>{uri.split(`${title}/`)[1]}</Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
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
    flexDirection: 'row',
    paddingHorizontal: 30,
    paddingVertical: 15,
    alignItems: 'center',
  },
  back: {
    width: 20,
    height: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.white,
    marginLeft: 10,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContainer: {
    paddingVertical: 10,
  },
  video: {
    width: 96,
    height: 64,
    borderRadius: 5,
    backgroundColor: Colors.witeAlpha(5),
  },
  folder: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
  textContainer: {
    paddingHorizontal: 15,
    marginRight: 30,
  },
  title: {
    color: Colors.witeAlpha(80),
    fontSize: 14,
    fontWeight: 'bold',
    width: width - 75 - 96,
  },
  res: {
    marginTop: 5,
    color: Colors.witeAlpha(50),
    fontSize: 12,
    fontWeight: 'bold',
  },
});
