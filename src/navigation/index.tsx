import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

import Splash from '../screens/splash';
import Videos from '../screens/videos';
import Player from '../screens/player';
import Folder from '../screens/folders';
import Settings from '../screens/settings';
import Routes from '../navigation/routes';
import linking from '../navigation/linking';
import About from '../screens/about';
import Terms from '../screens/terms';
import Privacy from '../screens/privacy';

import {hasPermissionAndroid} from '../common/utils';

export {Routes, type NativeStackScreenProps as ScreenProps};

const stackOptions: NativeStackNavigationOptions = {
  headerShown: false,
  animation: 'slide_from_right',
};

const Stack = createNativeStackNavigator();

const Navigation = () => {
  React.useEffect(() => {
    hasPermissionAndroid();
  }, []);

  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator screenOptions={stackOptions}>
        <Stack.Screen name={Routes.Splash} component={Splash} />
        <Stack.Screen name={Routes.Player} component={Player} />
        <Stack.Screen name={Routes.Folders} component={Folder} />
        <Stack.Screen name={Routes.Settings} component={Settings} />
        <Stack.Screen name={Routes.About} component={About} />
        <Stack.Screen name={Routes.Videos} component={Videos} />
        <Stack.Screen name={Routes.Terms} component={Terms} />
        <Stack.Screen name={Routes.Privacy} component={Privacy} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
