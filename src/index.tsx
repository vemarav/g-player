import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, StackNavigationOptions} from '@react-navigation/stack';

import Videos from './screens/videos';
import Player from './screens/player';
import Folder from './screens/folders';
import Routes from './navigation/routes';
import linking from './navigation/linking';
import {hasPermissionAndroid} from './common/utils';
import {AppState, AppStateStatus} from 'react-native';

import {HorizontalInterpolator} from './styles/navigation/interpolators';
import {Colors} from './styles/themes';

const stackOptions: StackNavigationOptions = {
  headerShown: false,
  transitionSpec: {
    open: {
      animation: 'timing',
      config: {
        duration: 300,
      },
    },
    close: {
      animation: 'timing',
      config: {
        duration: 300,
      },
    },
  },
  cardStyle: {backgroundColor: Colors.primary},
  cardStyleInterpolator: HorizontalInterpolator,
};

const Stack = createStackNavigator();

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
