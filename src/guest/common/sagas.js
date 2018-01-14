import {all, call, fork, put, takeLatest} from 'redux-saga/effects';
import {NavigationActions} from 'react-navigation';

import {ACTION_TYPES} from 'guest/common/actions';
import {API} from 'guest/common/api';
import {AUTH_KEY} from 'utils/env';

import {
  ACTION_TYPES as APP_ACTION_TYPES,
  ACTIONS as APP_ACTIONS,
} from 'app/common/actions';
import {
  forgetStorageItem,
  getStorageItem,
  setStorageItem,
} from 'utils/functions';
import I18n from 'utils/locale';
import {PUSH_TOKEN_KEY} from 'utils/env';
import {Schema} from 'utils/schema';
import {normalize} from 'normalizr';

function* login(action) {
  try {
    const pushTokenStorageKey = yield call(getStorageItem, PUSH_TOKEN_KEY);

    const params = {
      ...action.credentials,
      push_token: pushTokenStorageKey,
    };

    const response = yield call(API.login, params);
    console.log('r', response);

    const normalized = normalize(response.data, Schema.users);

    yield put({
      type: ACTION_TYPES.LOGIN_SUCCESS,
      entities: normalized.entities,
      payload: response.data,
    });

    yield call(setStorageItem, AUTH_KEY, response.meta.api_token || '');
  } catch (error) {
    yield put({type: ACTION_TYPES.LOGIN_FAILURE, error});
    yield put(APP_ACTIONS.setNotification(error, 'error'));
  }
}

function* register(action) {
  try {
    const response = yield call(API.register, action.params);
    yield put({type: ACTION_TYPES.REGISTER_SUCCESS, payload: response.data});

    yield put(
      APP_ACTIONS.setNotification(I18n.t('registration_success'), 'success'),
    );
    yield put(NavigationActions.back());
  } catch (error) {
    yield put({type: ACTION_TYPES.REGISTER_FAILURE, error});
    yield put({
      type: APP_ACTION_TYPES.SET_NOTIFICATION,
      payload: {
        message: error,
        messageType: 'error',
      },
    });
  }
}

function* forgotPassword(action) {
  try {
    const emailPattern = /(.+)@(.+){2,}\.(.+){2,}/;

    if (!emailPattern.test(action.params.email)) {
      return yield put(APP_ACTIONS.setNotification('Invalid Email', 'error'));
    }

    const response = yield call(API.forgotPassword, action.params);

    yield put({
      type: ACTION_TYPES.FORGOT_PASSWORD_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put(APP_ACTIONS.setNotification(error, 'error'));
    yield put({type: ACTION_TYPES.FORGOT_PASSWORD_FAILURE, error});
  }
}

function* recoverPassword(action) {
  try {
    const response = yield call(API.recoverPassword, action.params);
    yield put({
      type: ACTION_TYPES.RECOVER_PASSWORD_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put(APP_ACTIONS.setNotification(error, 'error'));
    yield put({type: ACTION_TYPES.RECOVER_PASSWORD_FAILURE, error});
  }
}

function* updatePassword(action) {
  try {
    const response = yield call(API.updatePassword, action.params);

    if (action.params.password !== action.params.password_confirmation) {
      return yield put(
        APP_ACTIONS.setNotification('Password does not match', 'error'),
      );
    }

    yield put({
      type: ACTION_TYPES.PASSWORD_UPDATE_SUCCESS,
      payload: response.data,
    });

    yield put(NavigationActions.back(null));
  } catch (error) {
    yield put(APP_ACTIONS.setNotification(error, 'error'));
    yield put({type: ACTION_TYPES.PASSWORD_UPDATE_FAILURE, error});
  }
}

function* logout() {
  yield call(forgetStorageItem, AUTH_KEY);
}

// Monitoring Sagas
function* loginMonitor() {
  yield takeLatest(ACTION_TYPES.LOGIN_REQUEST, login);
}

function* logoutMonitor() {
  yield takeLatest(ACTION_TYPES.LOGOUT, logout);
}

function* registerMonitor() {
  yield takeLatest(ACTION_TYPES.REGISTER_REQUEST, register);
}

function* forgotPasswordMonitor() {
  yield takeLatest(ACTION_TYPES.FORGOT_PASSWORD_REQUEST, forgotPassword);
}

function* recoverPasswordMonitor() {
  yield takeLatest(ACTION_TYPES.RECOVER_PASSWORD_REQUEST, recoverPassword);
}
function* passwordUpdateMonitor() {
  yield takeLatest(ACTION_TYPES.PASSWORD_UPDATE_REQUEST, updatePassword);
}

export const sagas = all([
  fork(loginMonitor),
  fork(logoutMonitor),
  fork(registerMonitor),
  fork(recoverPasswordMonitor),
  fork(forgotPasswordMonitor),
  fork(passwordUpdateMonitor),
]);
