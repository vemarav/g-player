import {Alert, BackHandler, Linking, PermissionsAndroid} from 'react-native';

export const getTime = (seconds: number): string => {
  const _seconds = `${Math.floor(seconds) % 60}`.padStart(2, '0');
  const _minutes = `${Math.floor(seconds / 60) % 60}`.padStart(2, '0');
  const _hours = `${Math.floor(seconds / 3600) % 24}`.padStart(2, '0');
  if (Number(_hours) > 0) {
    return `${_hours}:${_minutes}:${_seconds}`;
  } else {
    return `${_minutes}:${_seconds}`;
  }
};

export const getTimeInSeconds = (time: string): number => {
  const sum = (a: number, b: number) => a + b;
  const timeConverter = (t: string, index: number) => +t * 60 ** index;
  const timeInSec = time.split(':').reverse().map(timeConverter).reverse().reduce(sum, 0);
  return +timeInSec;
};

export const hasPermissionAndroid = async () => {
  const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;
  const hasPermission = await PermissionsAndroid.check(permission);
  if (hasPermission) return true;
  const status = await PermissionsAndroid.request(permission);
  return status === 'granted' ? true : showDialog();
};

const showDialog = () => {
  Alert.alert(
    'Allow files access',
    'In order to play video, app needs access to media files on your device. Go to settings to enable the permission.',
    [
      {text: 'EXIT APP', onPress: BackHandler.exitApp},
      {
        text: 'OPEN APP SETTING',
        onPress: Linking.openSettings,
      },
    ],
    {cancelable: true},
  );
  return false;
};

export const encoder = (url: string) => url.replace(/#|\s/i, encodeURIComponent);
