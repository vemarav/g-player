import React, {useEffect, useState} from 'react';
import {StatusBar, View, AppStateStatus} from 'react-native';
import {Text, ScrollView, TouchableOpacity, RefreshControl, AppState} from 'react-native';
import CameraRoll, {Album, GetAlbumsParams} from '@react-native-community/cameraroll';

import Icons from '../../assets/icons';
import {Colors} from '../styles/themes';
import Routes from '../navigation/routes';
import applyStyles from '../styles/screens/folders';
import Header from '../components/header';

const Folders = (props: any) => {
  const styles = applyStyles();
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

  const loadAlbums = async (s?: AppStateStatus) => {
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

  return (
    <View style={styles.container}>
      <Header title="Folders" />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContainer}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={isLoading} onRefresh={loadAlbums} />}>
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
    </View>
  );
};

export default Folders;