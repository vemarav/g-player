import React, {useEffect, useState} from 'react';
import {StatusBar, View, StyleSheet, Dimensions} from 'react-native';
import {RefreshControl, AppState} from 'react-native';
import {Text, ScrollView, TouchableOpacity} from 'react-native';
import CameraRoll, {GetPhotosParams, PhotoIdentifier} from '@react-native-community/cameraroll';
import Image from 'react-native-fast-image';

import Routes from '../navigation/routes';
import {encoder} from '../common/utils';
import Header from '../components/header';
import applyStyles from '../styles/screens/videos';

// const {width} = Dimensions.get('screen');

interface Video extends PhotoIdentifier {}

const Videos = (props: any) => {
  const {title, count} = props.route.params;
  const styles = applyStyles();
  const folderOptions: GetPhotosParams = {
    first: count,
    assetType: 'Videos',
    groupName: title,
    include: ['fileSize'],
  };

  const [isLoading, setLoading] = useState<boolean>(false);
  const [videos, setVideos] = useState<Array<Video>>([]);

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
      <Header title={title} isPop={true} />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContainer}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={isLoading} onRefresh={loadFiles} />}>
        {videos.map((video: Video) => {
          const uri = video.node.image?.uri;
          return (
            <TouchableOpacity onPress={() => navigateTo(Routes.Player, {uri})} key={uri}>
              <View style={styles.folder}>
                <Image source={{uri: encoder(uri)}} style={styles.video} />
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
