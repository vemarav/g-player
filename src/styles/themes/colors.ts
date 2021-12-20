import {useColorScheme} from 'react-native';

const light = {
  scheme: 'light',
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
  scheme: 'dark',
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
type Dark = typeof dark;

export interface Colors extends Light, Dark {
  barStyle: 'light-content' | 'dark-content' | any;
  scheme: 'light' | 'dark' | any;
}

export default (): Colors => {
  const appearance = useColorScheme();
  return appearance === 'light' ? light : dark;
};
