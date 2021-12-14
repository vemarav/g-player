import React, {useState} from 'react';
import {DarkTheme, DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';

import Videos from './screens/videos';
import Player from './screens/player';
import Folder from './screens/folders';
import Routes from './navigation/routes';
import linking from './navigation/linking';
import {hasPermissionAndroid} from './common/utils';
import {AppState, AppStateStatus} from 'react-native';

const config = {
  animatin: 'timing',
  config: {duration: 3000},
};

const transitionSpec: any = {
  transitionSpec: {
    open: config,
    close: config,
  },
};

const stackOptions: NativeStackNavigationOptions = {
  headerShown: false,
  animation: 'slide_from_right',
  ...transitionSpec,
};
const Stack = createNativeStackNavigator();

const Navigation = () => {
  const [state, setState] = useState<AppStateStatus>(AppState.currentState);
  React.useEffect(() => {
    hasPermissionAndroid();
    const appStateSub = AppState.addEventListener('change', setState);
    return () => {
      appStateSub?.remove();
    };
  }, []);

  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator screenOptions={stackOptions}>
        <Stack.Screen name={Routes.Folders} component={Folder} />
        <Stack.Screen name={Routes.Videos} component={Videos} />
        <Stack.Screen name={Routes.Player} component={Player} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
