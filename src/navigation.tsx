import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Videos from './videos';
import Player from './player';
import Routes from './routes';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name={Routes.Videos}
          options={{headerShown: false, animation: 'slide_from_right'}}
          component={Videos}
        />
        <Stack.Screen
          name={Routes.Player}
          options={{headerShown: false, animation: 'slide_from_right'}}
          component={Player}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
