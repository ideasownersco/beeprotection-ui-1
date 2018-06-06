import I18n from 'utils/locale';
import isNull from 'lodash/isNull';
import CodePush from 'react-native-code-push';
import {all, call, fork, put, takeLatest} from 'redux-saga/effects';
import {I18nManager} from 'react-native';
import {API} from 'app/common/api';
import {API as CUSTOMER_API} from 'customer/common/api';
import {ACTION_TYPES} from 'app/common/actions';
import {ACTION_TYPES as CUSTOMER_ACTION_TYPES} from 'customer/common/actions';
import {
  INSTALLED_KEY,
  COUNTRY_KEY,
  LANGUAGE_KEY,
  PUSH_TOKEN_KEY,
  AUTH_KEY,
  DEVICE_UUID_KEY,
  DEFAULT_LANGUAGE,
} from 'utils/env';
import {API as AUTH_API} from 'guest/common/api';
import {ACTION_TYPES as AUTH_ACTION_TYPES} from 'guest/common/actions';
import {normalize} from 'normalizr';
import {setStorageItem, getStorageItem} from 'utils/functions';
import {Schema} from 'utils/schema';
import DeviceInfo from 'react-native-device-info';

function* setInstalled() {
  yield call(setStorageItem, INSTALLED_KEY, 'INSTALLED');
  yield put({type: ACTION_TYPES.INSTALL_SUCCESS, value: true});
}

function* boot() {
  // 1- Set is the app has installed(run) before
  let installedStorageKey = yield call(getStorageItem, INSTALLED_KEY);
  if (!isNull(installedStorageKey)) {
    yield put({type: ACTION_TYPES.INSTALL_SUCCESS, value: true});
  } else {
  }

  // run on first
  const uniqueId = DeviceInfo.getUniqueID();

  try {
    let response = yield call(API.storeDeviceID, {
      body: {
        uuid: uniqueId,
      },
    });
    if (response.success) {
      yield call(setStorageItem, DEVICE_UUID_KEY, uniqueId);
    }
  } catch (error) {
    console.log('error registering uuid', error);
  }

  try {
    let params = {
      uuid: uniqueId,
    };

    let response = yield call(CUSTOMER_API.fetchHasFreeWash, params);
    if (response.success) {
      yield put({
        type: CUSTOMER_ACTION_TYPES.FETCH_HAS_FREE_WASH_SUCCESS,
        uuid: uniqueId,
      });
    }
  } catch (error) {}

  // 2- Set language from history
  let currentLanguage = yield call(getStorageItem, LANGUAGE_KEY);
  // if (isNull(currentLanguage)) {
  //   currentLanguage = DEFAULT_LANGUAGE;
  // }

  if (currentLanguage) {
    I18n.locale = currentLanguage;
    yield put({
      type: ACTION_TYPES.SET_LANGUAGE_SUCCESS,
      language: currentLanguage,
    });
  }

  //3- Login from history and sync push token to user if exists
  const authStorageKey = yield call(getStorageItem, AUTH_KEY);
  if (!isNull(authStorageKey)) {
    const pushTokenStorageKey = yield call(getStorageItem, PUSH_TOKEN_KEY);
    try {
      let response = yield call(AUTH_API.login, {
        body: {
          push_token: pushTokenStorageKey,
        },
      });
      const normalized = normalize(response.data, Schema.users);

      yield put({
        type: AUTH_ACTION_TYPES.LOGIN_SUCCESS,
        entities: normalized.entities,
        payload: response.data,
      });

      yield put({
        type: AUTH_ACTION_TYPES.SYNC_USER_TO_SOCKET,
      });
    } catch (error) {
      yield put({type: AUTH_ACTION_TYPES.LOGIN_FAILURE, error});
    }
  }

  //4- boot the app
  yield put({type: ACTION_TYPES.BOOT_SUCCESS});
}

function* setCountry(action) {
  let currentCountry = yield getStorageItem(COUNTRY_KEY);

  if (currentCountry === action.country) return;

  yield call(setStorageItem, COUNTRY_KEY, action.country);

  yield put({type: ACTION_TYPES.SET_COUNTRY_SUCCESS, country: action.country});
}

function* setLanguage(action) {
  if (action.language === 'ar') {
    I18nManager.allowRTL(true);
    I18nManager.forceRTL(true);
  } else {
    I18nManager.allowRTL(false);
    I18nManager.forceRTL(false);
  }

  yield call(setStorageItem, LANGUAGE_KEY, action.language);

  yield put({
    type: ACTION_TYPES.SET_LANGUAGE_SUCCESS,
    language: action.language,
  });

  CodePush.restartApp();
}

function* setPushToken(action) {
  try {
    const params = {
      body: {
        token: action.params.token,
        os: action.params.os,
      },
    };

    const pushTokenStorageKey = yield call(getStorageItem, PUSH_TOKEN_KEY);

    if (!pushTokenStorageKey) {
      yield call(setStorageItem, PUSH_TOKEN_KEY, action.params.token);
    }

    yield call(API.storePushToken, params);

    yield put({
      type: ACTION_TYPES.SET_PUSH_TOKEN_SUCCESS,
      token: action.params.token,
    });
  } catch (error) {
    yield put({type: ACTION_TYPES.SET_PUSH_TOKEN_FAILURE, error});
  }
}

function* bootMonitor() {
  yield takeLatest(ACTION_TYPES.BOOT_REQUEST, boot);
}

function* setCountryMonitor() {
  yield takeLatest(ACTION_TYPES.SET_COUNTRY_REQUEST, setCountry);
}

export function* setLanguageMonitor() {
  yield takeLatest(ACTION_TYPES.SET_LANGUAGE_REQUEST, setLanguage);
}

export function* setPushTokenMonitor() {
  yield takeLatest(ACTION_TYPES.SET_PUSH_TOKEN_REQUEST, setPushToken);
}

export function* setInstalledMonitor() {
  yield takeLatest(ACTION_TYPES.INSTALL_REQUEST, setInstalled);
}

export const sagas = all([
  fork(bootMonitor),
  fork(setCountryMonitor),
  fork(setLanguageMonitor),
  fork(setPushTokenMonitor),
  fork(setInstalledMonitor),
]);
