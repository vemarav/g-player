import React, {useEffect, useRef, useState} from 'react';
import {StatusBar, View, Platform, StyleSheet, Dimensions} from 'react-native';
import {Text, ScrollView, TouchableOpacity} from 'react-native';
import CameraRoll, {GetPhotosParams, PhotoIdentifier} from '@react-native-community/cameraroll';
import Video, {OnLoadData} from 'react-native-video';

import {hasPermissionAndroid} from './utils';
import Colors from './colors';
import Icons from '../assets/icons';
import Routes from './routes';

const {width} = Dimensions.get('screen');

const Videos = (props: any) => {
  const {title, count} = props.route.params;
  const [videos, setVideos] = useState<Array<PhotoIdentifier>>([]);
  const videoRefs = useRef<Array<any>>([]);

  useEffect(() => {
    setTimeout(() => {
      hasPermissionAndroid().then(granted => {
        if (granted) {
          const folderOptions: GetPhotosParams = {
            first: count,
            assetType: 'Videos',
            groupName: title,
          };
          CameraRoll.getPhotos(folderOptions).then(list => setVideos(list.edges));
        }
      });
    }, 300);
  }, []);

  const navigateTo = (route: string, params: any = {}) => {
    props.navigation.navigate(route, params);
  };

  const seekTo = (data: OnLoadData, index: number) => {
    videoRefs.current[index]?.seek(data.duration / 2);
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden={false} />

      <View style={styles.border}>
        <TouchableOpacity onPress={() => navigateTo(Routes.Folders)}>
          <Icons.Back {...styles.back} />
        </TouchableOpacity>
        <Text style={styles.header}>Videos</Text>
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContainer}>
        {videos.map((video: PhotoIdentifier, index: number) => {
          const {uri} = video.node.image;
          return (
            <TouchableOpacity onPress={() => navigateTo(Routes.Player, {uri})} key={uri}>
              <View style={styles.folder}>
                {uri ? (
                  <Video
                    ref={ref => (videoRefs.current[index] = ref)}
                    paused
                    style={styles.video}
                    source={{uri}}
                    onLoad={data => seekTo(data, index)}
                    resizeMode={'contain'}
                  />
                ) : null}
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
    width: 24,
    height: 24,
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
    paddingVertical: 20,
  },
  textContainer: {
    paddingHorizontal: 15,
    marginRight: 30,
  },
  title: {
    color: Colors.witeAlpha(60),
    fontSize: 14,
    fontWeight: 'bold',
    width: width - 75 - 96,
  },
});
