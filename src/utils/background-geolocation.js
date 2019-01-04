import {GEOLOCATION_SOUNDS_ENABLED} from 'utils/env';
import BackgroundGeolocation from 'react-native-background-geolocation';

export default {
  desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_HIGH,
  distanceFilter: 20,
  stopOnTerminate: false,
  preventSuspend: true,
  startOnBoot: true,
  foregroundService: true,
  enableHeadless: true,
  autoSync: true,
  debug: GEOLOCATION_SOUNDS_ENABLED,
  logLevel: GEOLOCATION_SOUNDS_ENABLED
    ? BackgroundGeolocation.LOG_LEVEL_VERBOSE
    : BackgroundGeolocation.LOG_LEVEL_OFF,
  maxRecordsToPersist: 1,
};
