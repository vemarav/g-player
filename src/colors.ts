const Colors = {
  black: '#000000',
  white: '#ffffff',
  blackAlpha: (alpha: number) => `rgba(0,0,0,${alpha / 100})`,
  witeAlpha: (alpha: number) => `rgba(255,255,255,${alpha / 100})`,
};

export default Colors;
