import {Appearance, ColorValue, OpaqueColorValue, StatusBarStyle} from 'react-native';

export interface IColors {
  white: string;
  black: string;
  blackAlpha: (alpha: number) => string;
  primary: string;
  secondary: string;
  barStyle: StatusBarStyle;
  primaryAlpha: (alpha: number) => string;
  secondaryAlpha: (alpha: number) => string;
}

const light: IColors = {
  white: '#ffffff',
  black: '#000000',
  primary: '#ffffff',
  secondary: '#000000',
  barStyle: 'dark-content',
  blackAlpha: (alpha: number) => `rgba(0,0,0,${alpha / 100})`,
  secondaryAlpha: (alpha: number) => `rgba(0,0,0,${alpha / 100})`,
  primaryAlpha: (alpha: number) => `rgba(255,255,255,${alpha / 100})`,
};

const dark: IColors = {
  white: '#ffffff',
  black: '#000000',
  primary: '#000000',
  secondary: '#ffffff',
  barStyle: 'light-content',
  blackAlpha: (alpha: number) => `rgba(0,0,0,${alpha / 100})`,
  primaryAlpha: (alpha: number) => `rgba(0,0,0,${alpha / 100})`,
  secondaryAlpha: (alpha: number) => `rgba(255,255,255,${alpha / 100})`,
};

const Colors = Appearance.getColorScheme() === 'light' ? light : dark;

export default Colors;
