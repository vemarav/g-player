import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {RefreshControl, AppState} from 'react-native';
import {Text, ScrollView, TouchableOpacity} from 'react-native';
import CameraRoll, {GetPhotosParams, PhotoIdentifier} from '@react-native-community/cameraroll';
import Image from 'react-native-fast-image';

import {encoder} from '../common/utils';
import Header from '../components/header';
import useStyles from '../styles/screens/videos';
import {Routes} from '../navigation';

interface Video extends PhotoIdentifier {}

interface Props {
  navigation: {
    navigate: (f: string, p: {}) => void;
  };
  route: {
    params: {
      title: string;
      count: number;
    };
  };
}

const Videos = (props: Props) => {
  const {title, count} = props.route.params;
  const styles = useStyles();
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
                  <Text style={styles.title} numberOfLines={2}>
                    {uri.split(`${title}/`)[1]}
                  </Text>
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
