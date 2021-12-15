import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, StackNavigationOptions} from '@react-navigation/stack';

import Videos from './screens/videos';
import Player from './screens/player';
import Folder from './screens/folders';
import Routes from './navigation/routes';
import linking from './navigation/linking';
import {hasPermissionAndroid} from './common/utils';
import {HorizontalInterpolator} from './styles/navigation/interpolators';

const stackOptions: StackNavigationOptions = {
  headerShown: false,
  cardStyleInterpolator: HorizontalInterpolator,
};

const Stack = createStackNavigator();

const Navigation = () => {
  React.useEffect(() => {
    hasPermissionAndroid();
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
