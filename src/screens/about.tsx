import React from 'react';
import {TouchableOpacity, Text, View} from 'react-native';
import Image from 'react-native-fast-image';

import Icons from '../../assets/icons';
import Header from '../components/header';
import {Routes, ScreenProps} from '../navigation';
import useStyles from '../styles/screens/about';

const About = (props: ScreenProps<any>) => {
  const styles = useStyles();

  const navigateTo = (screen: string, params = {}) => {
    props.navigation.navigate(screen, params);
  };

  const currentYear = new Date().getFullYear();

  return (
    <View style={styles.container}>
      <Header title="About" isPop />
      <View style={styles.imageContainer}>
        <Image source={Icons.Logo[styles.theme]} style={styles.image} />
      </View>
      <Text style={styles.appName}>Video Player</Text>
      <Text style={styles.versionName}>Version 1.0.0</Text>

      <View style={styles.bottom}>
        <View style={styles.row}>
          <TouchableOpacity onPress={() => navigateTo(Routes.Terms)}>
            <Text style={styles.policy}>Terms of Use</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigateTo(Routes.Privacy)}>
            <Text style={styles.policy}>Privacy Policy</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.copyright}>
          © 2021{currentYear > 2021 ? ` - ${currentYear}` : null}, Gargantua Exploration Co.
        </Text>
      </View>
    </View>
  );
};

export default About;
