import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';

import Header from '../components/header';
import {Routes, ScreenProps} from '../navigation';
import {useAppDispatch, useAppSelector} from '../store/hooks';
import {darkTheme, lightTheme, systemTheme} from '../store/slices/theme';
import useStyles from '../styles/screens/settings';

const Settings = (props: ScreenProps<any>) => {
  const styles = useStyles();
  const mode = useAppSelector(state => state.theme.mode);
  const dispatch = useAppDispatch();

  const navigateTo = (screen: string, params = {}) => {
    props.navigation.navigate(screen, params);
  };

  const checked = (isSelected: boolean) => (isSelected ? '✓' : '   ');

  const isLight = mode === 'light';
  const isDark = mode === 'dark';
  const isNull = mode === null;

  return (
    <View style={styles.container}>
      <Header title="Settings" isPop />
      <View style={styles.listContainer}>
        <View style={styles.itemContainer}>
          <Text style={styles.title}>Theme</Text>
          <View style={styles.listContainer}>
            <Text
              style={[styles.subtitle, isLight ? styles.selectedTheme : {}]}
              onPress={() => dispatch(lightTheme())}>
              {`${checked(isLight)} Light`}
            </Text>
            <Text
              style={[styles.subtitle, isDark ? styles.selectedTheme : {}]}
              onPress={() => dispatch(darkTheme())}>
              {`${checked(isDark)} Dark`}
            </Text>
            <Text
              style={[styles.subtitle, isNull ? styles.selectedTheme : {}]}
              onPress={() => dispatch(systemTheme())}>
              {`${checked(isNull)} System Default`}
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
