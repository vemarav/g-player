import Play from './Play';
import Pause from './Pause';
import Information from './Info';
import VolumeUp from './VolumeUp';
import Back from './Back';
import Brightness from './Brightness';
import Folder from './Folder';
import Subtitles from './Subtitles';
import Audio from './Audio';
import ScreenRotation from './ScreenRotation';
import Speed from './Speed';
import Settings from './Settings';
import Loop from './Loop';

const WhiteLogo = require('./WhiteLogo.png');
const BlackLogo = require('./BlackLogo.png');
const Logo: {[key: string]: any} = {light: WhiteLogo, dark: BlackLogo};

export default {
  Back,
  Logo,
  Loop,
  Play,
  Speed,
  Pause,
  Audio,
  Folder,
  VolumeUp,
  Settings,
  Subtitles,
  Brightness,
  Information,
  ScreenRotation,
};
