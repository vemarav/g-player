import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {Text, ScrollView, TouchableOpacity, RefreshControl, AppState} from 'react-native';
import CameraRoll, {Album, GetAlbumsParams} from '@react-native-community/cameraroll';

import Icons from '../../assets/icons';
import useStyles from '../styles/screens/folders';
import Header from '../components/header';
import {Routes, ScreenProps} from '../navigation';

const Folders = (props: ScreenProps<any>) => {
  const styles = useStyles();
  const folderOptions: GetAlbumsParams = {assetType: 'Videos'};

  const [isLoading, setLoading] = useState<boolean>(true);
  const [albums, setAlbums] = useState<Array<Album>>([]);

  useEffect(() => {
    loadAlbums();
    const appStateListener = AppState.addEventListener('change', loadAlbums);
    () => {
      appStateListener.remove();
    };
  }, []);

  const loadAlbums = async () => {
    setLoading(true);
    try {
      setAlbums(await CameraRoll.getAlbums(folderOptions));
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const navigateTo = (route: string, params: any = {}) => {
    props.navigation.navigate(route, params);
  };

  const getVideoText = (n: number) => (n > 1 ? 'Videos' : 'Video');

  const settingsIcon = (
    <TouchableOpacity onPress={() => navigateTo(Routes.Settings)}>
      <Icons.Settings {...styles.settingsIcon} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Header title="Folders" icon={settingsIcon} />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContainer}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={isLoading} onRefresh={loadAlbums} />}>
        {albums.length > 0 ? (
          albums.map((album: Album) => (
            <TouchableOpacity onPress={() => navigateTo(Routes.Videos, album)} key={album.title}>
              <View style={styles.folder}>
                <Icons.Folder {...styles.icon} />
                <View style={styles.textContainer}>
                  <Text style={styles.title} numberOfLines={1}>
                    {album.title}
                  </Text>
                  <Text style={styles.count}>
                    {album.count} {getVideoText(album.count)}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <Text style={styles.empty}>No videos found</Text>
        )}
      </ScrollView>
    </View>
  );
};

export default Folders;
