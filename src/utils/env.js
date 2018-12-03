const defaults = {};

if (__DEV__) {
  module.exports = {
    ...defaults,
    // NETWORK_PROTOCOL:'http://',
    // API_URL: 'beeprotection.test/api',
    // SOCKET_SERVER: 'http://beeprotection.test:3000',
    // PAYMENT_ENDPOINT: 'http://beeprotection.test/payment/knet',

    NETWORK_PROTOCOL:'https://',
    API_URL: 'beeprotection.net/api',
    SOCKET_SERVER: 'http://beeprotection.net:3000',
    PAYMENT_ENDPOINT: 'https://beeprotection.net/payment/knet',

    GOOGLE_MAPS_KEY: 'AIzaSyCpQX4H0QPxVgKuNMZ0ELG_ymgT8RHcKh4',
    GOOGLE_MAPS_IOS_KEY: 'AIzaSyDPCgdWqrkBe4v3uSuU-MZGJIZ0AQxfbCo',
    GOOGLE_MAPS_ANDROID_KEY: 'AIzaSyCpQX4H0QPxVgKuNMZ0ELG_ymgT8RHcKh4',
    DEFAULT_LANGUAGE: 'en',
    DEFAULT_COUNTRY: 'KW',
    AUTH_KEY: 'AUTH_KEY',
    INSTALLED_KEY: 'INSTALLED_KEY',
    LANGUAGE_KEY: 'LANGUAGE_KEY',
    PUSH_TOKEN_KEY: 'PUSH_TOKEN_KEY',
    COUNTRY_KEY: 'COUNTRY_KEY',
    DEVICE_UUID_KEY: 'DEVICE_UUID',
    CODE_PUSH_ENABLED: false,
    GEOLOCATION_SOUNDS_ENABLED: true,
  };
} else {
  module.exports = {
    ...defaults,
    NETWORK_PROTOCOL:'https://',
    API_URL: 'beeprotection.net/api',
    SOCKET_SERVER: 'http://beeprotection.net:3000',
    PAYMENT_ENDPOINT: 'https://beeprotection.net/payment/knet',

    GOOGLE_MAPS_KEY: 'AIzaSyCpQX4H0QPxVgKuNMZ0ELG_ymgT8RHcKh4',
    GOOGLE_MAPS_IOS_KEY: 'AIzaSyDPCgdWqrkBe4v3uSuU-MZGJIZ0AQxfbCo',
    GOOGLE_MAPS_ANDROID_KEY: 'AIzaSyCpQX4H0QPxVgKuNMZ0ELG_ymgT8RHcKh4',
    DEFAULT_LANGUAGE: 'en',
    DEFAULT_COUNTRY: 'KW',
    AUTH_KEY: 'AUTH_KEY',
    INSTALLED_KEY: 'INSTALLED_KEY',
    LANGUAGE_KEY: 'LANGUAGE_KEY',
    PUSH_TOKEN_KEY: 'PUSH_TOKEN_KEY',
    COUNTRY_KEY: 'COUNTRY_KEY',
    DEVICE_UUID_KEY: 'DEVICE_UUID',
    CODE_PUSH_ENABLED: true,
    GEOLOCATION_SOUNDS_ENABLED: false,
  };
}
