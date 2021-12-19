import {types} from '@babel/core';
import {useColorScheme} from 'react-native';

const light = {
  white: '#ffffff',
  black: '#000000',
  primary: '#ffffff',
  secondary: '#000000',
  barStyle: 'dark-content',
  blackAlpha: (alpha: number) => `rgba(0,0,0,${alpha / 100})`,
  secondaryAlpha: (alpha: number) => `rgba(0,0,0,${alpha / 100})`,
  primaryAlpha: (alpha: number) => `rgba(255,255,255,${alpha / 100})`,
};

const dark = {
  white: '#ffffff',
  black: '#000000',
  primary: '#000000',
  secondary: '#ffffff',
  barStyle: 'light-content',
  blackAlpha: (alpha: number) => `rgba(0,0,0,${alpha / 100})`,
  primaryAlpha: (alpha: number) => `rgba(0,0,0,${alpha / 100})`,
  secondaryAlpha: (alpha: number) => `rgba(255,255,255,${alpha / 100})`,
};

type Light = typeof light;

export interface Colors extends Light {
  barStyle: 'light-content' | 'dark-content' | string;
}

export default () => {
  const appearance = useColorScheme();

  return appearance === 'light' ? light : dark;
};
