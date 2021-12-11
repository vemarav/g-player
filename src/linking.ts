import {Linking} from 'react-native';
import Routes from './routes';

const linking = {
  prefixes: ['content://'],
  subscribe(listener: (url: string) => void) {
    const onReceiveURL = ({url}: {url: string}) => {
      listener(url);
      console.log(url);
    };
    // Listen to incoming links from deep linking
    Linking.addEventListener('url', onReceiveURL);

    // Listen to notifications
    return () => {
      // Clean up the event listeners
      Linking.removeAllListeners('url');
    };
  },
  config: {
    screens: {
      [Routes.Player]: 'media/external/file/:id',
    },
  },
};

export default linking;
