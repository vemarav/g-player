import fonts, {Fonts} from './fonts';
import useColors, {Colors} from './colors';

export interface Theme {
  fonts: typeof Fonts;
  colors: Colors;
}

export default (): Theme => {
  const colors = useColors();

  return {fonts, colors};
};
