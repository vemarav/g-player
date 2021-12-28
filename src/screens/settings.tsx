import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';

import Header from '../components/header';
import {Routes, ScreenProps} from '../navigation';
import {useAppDispatch, useAppSelector} from '../store/hooks';
import {setTheme, setPlayBack} from '../store/slices/settings';
import useStyles from '../styles/screens/settings';

const Settings = (props: ScreenProps<any>) => {
  const styles = useStyles();
  const theme = useAppSelector(state => state.settings.theme);
  const playback = useAppSelector(state => state.settings.playback);
  const dispatch = useAppDispatch();

  const navigateTo = (screen: string, params = {}) => {
    props.navigation.navigate(screen, params);
  };

  const checked = (isSelected: boolean) => (isSelected ? '✓' : '   ');

  const isLight = theme === 'light';
  const isDark = theme === 'dark';
  const isNull = !theme;

  const isStart = playback === 'start';
  const isResume = playback === 'resume';

  return (
    <View style={styles.container}>
      <Header title="Settings" isPop />
      <View style={styles.listContainer}>
        <View style={styles.itemContainer}>
          <Text style={styles.title}>Playback</Text>
          <View style={styles.listContainer}>
            <Text
              style={[styles.subtitle, isStart ? styles.selectedTheme : {}]}
              onPress={() => dispatch(setPlayBack('start'))}>
              {`${checked(isStart)} Start video from beginning`}
            </Text>
            <Text
              style={[styles.subtitle, isResume ? styles.selectedTheme : {}]}
              onPress={() => dispatch(setPlayBack('resume'))}>
              {`${checked(isResume)} Resume`}
            </Text>
          </View>
        </View>
        <View style={styles.itemContainer}>
          <Text style={styles.title}>Theme</Text>
          <View style={styles.listContainer}>
            <Text
              style={[styles.subtitle, isNull ? styles.selectedTheme : {}]}
              onPress={() => dispatch(setTheme())}>
              {`${checked(isNull)} System Default`}
            </Text>
            <Text
              style={[styles.subtitle, isLight ? styles.selectedTheme : {}]}
              onPress={() => dispatch(setTheme('light'))}>
              {`${checked(isLight)} Light`}
            </Text>
            <Text
              style={[styles.subtitle, isDark ? styles.selectedTheme : {}]}
              onPress={() => dispatch(setTheme('dark'))}>
              {`${checked(isDark)} Dark`}
            </Text>
          </View>
        </View>

        <TouchableOpacity style={styles.itemContainer} onPress={() => navigateTo(Routes.About)}>
          <Text style={styles.title}>About</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Settings;
