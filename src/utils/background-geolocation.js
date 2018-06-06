import {GEOLOCATION_SOUNDS_ENABLED} from 'utils/env';
import BackgroundGeolocation from 'react-native-background-geolocation';

export default {
  distanceFilter: 100,
  stopOnTerminate: false,
  preventSuspend: false,
  startOnBoot: true,
  foregroundService: true,
  autoSync: true,
  debug: GEOLOCATION_SOUNDS_ENABLED,
  logLevel: GEOLOCATION_SOUNDS_ENABLED
    ? BackgroundGeolocation.LOG_LEVEL_VERBOSE
    : BackgroundGeolocation.LOG_LEVEL_OFF,
  maxRecordsToPersist: 1,
};
