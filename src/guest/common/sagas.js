import {all, call, fork, put, takeLatest} from 'redux-saga/effects';
import {NavigationActions} from 'react-navigation';
import NavigatorService from 'components/NavigatorService';
import {ACTION_TYPES} from 'guest/common/actions';
import {API} from 'guest/common/api';
import {AUTH_KEY} from 'utils/env';

import {ACTIONS as APP_ACTIONS} from 'app/common/actions';
import {
  forgetStorageItem,
  getStorageItem,
  setStorageItem,
} from 'utils/functions';
import I18n from 'utils/locale';
import {PUSH_TOKEN_KEY} from 'utils/env';
import {Schema} from 'utils/schema';
import {normalize} from 'normalizr';
import {Platform} from 'react-native';

function* tokenLogin(action) {
  try {
    const pushTokenStorageKey = yield call(getStorageItem, PUSH_TOKEN_KEY);

    const params = {
      body: {
        token: pushTokenStorageKey,
        os: Platform.OS === 'ios' ? 'ios' : 'android',
      },
    };

    const response = yield call(API.login, params);

    if (response.meta) {
      yield call(setStorageItem, AUTH_KEY, response.meta.api_token || '');
    }

    const normalized = normalize(response.data, Schema.users);

    yield put({
      type: ACTION_TYPES.SYNC_USER_TO_SOCKET,
    });

    yield put({
      type: ACTION_TYPES.TOKEN_LOGIN_SUCCESS,
      entities: normalized.entities,
      payload: response.data,
    });
  } catch (error) {
    yield put({type: ACTION_TYPES.TOKEN_LOGIN_FAILURE, error});
  }
}

function* login(action) {
  const {credentials, resolve, reject, redirectRoute} = action.payload;

  try {
    const pushTokenStorageKey = yield call(getStorageItem, PUSH_TOKEN_KEY);

    const params = {
      body: {
        ...credentials,
        token: pushTokenStorageKey,
        os: Platform.OS === 'ios' ? 'ios' : 'android',
      },
    };

    const response = yield call(API.login, params);

    if (response.meta) {
      yield call(setStorageItem, AUTH_KEY, response.meta.api_token || '');
    }

    const normalized = normalize(response.data, Schema.users);

    yield put({
      type: ACTION_TYPES.SYNC_USER_TO_SOCKET,
    });

    yield put({
      type: ACTION_TYPES.LOGIN_SUCCESS,
      entities: normalized.entities,
      payload: response.data,
    });

    if (redirectRoute) {
      // yield setTimeout(() => {
      NavigatorService.navigate(redirectRoute);
      // },1000);
    }

    yield resolve(response.data);
  } catch (error) {
    yield put({type: ACTION_TYPES.LOGIN_FAILURE, error});

    yield put(
      APP_ACTIONS.setNotification({
        message: error,
        type: 'error',
      }),
    );

    yield reject(error);
  }
}

function* register(action) {
  const {credentials, resolve, reject} = action.payload;

  try {
    const params = {
      body: {
        ...credentials,
      },
    };
    const response = yield call(API.register, params);
    yield put({type: ACTION_TYPES.REGISTER_SUCCESS, payload: response.data});
    yield resolve(response.data);
  } catch (error) {
    yield put({type: ACTION_TYPES.REGISTER_FAILURE, error});
    yield put(
      APP_ACTIONS.setNotification({
        message: error,
        type: 'error',
      }),
    );
    yield reject(error);
  }
}

function* forgotPassword(action) {
  try {
    const emailPattern = /(.+)@(.+){2,}\.(.+){2,}/;

    if (!emailPattern.test(action.params.email)) {
      return yield put(
        APP_ACTIONS.setNotification({
          message: 'Invalid Email',
          type: 'error',
        }),
      );
    }

    const params = {
      body: {
        ...action.params,
      },
    };

    const response = yield call(API.forgotPassword, params);

    yield put({
      type: ACTION_TYPES.FORGOT_PASSWORD_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put(
      APP_ACTIONS.setNotification({
        message: error,
        type: 'error',
      }),
    );
    yield put({type: ACTION_TYPES.FORGOT_PASSWORD_FAILURE, error});
  }
}

function* confirmRegistration(action) {
  try {
    const params = {
      body: {
        ...action.params,
      },
    };

    const response = yield call(API.confirmRegistration, params);
    yield put({
      type: ACTION_TYPES.ACCOUNT_CONFIRMATION_SUCCESS,
      payload: response.data,
    });

    yield put(
      APP_ACTIONS.setNotification({
        message: I18n.t('registration_success'),
        type: 'success',
      }),
    );

    yield NavigatorService.back();
  } catch (error) {
    yield put(
      APP_ACTIONS.setNotification({
        message: error,
        type: 'error',
      }),
    );
    yield put({type: ACTION_TYPES.ACCOUNT_CONFIRMATION_FAILURE, error});
  }
}

function* recoverPassword(action) {
  try {
    const params = {
      body: {
        ...action.params,
      },
    };

    const response = yield call(API.recoverPassword, params);
    yield put({
      type: ACTION_TYPES.RECOVER_PASSWORD_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put(
      APP_ACTIONS.setNotification({
        message: error,
        type: 'error',
      }),
    );
    yield put({type: ACTION_TYPES.RECOVER_PASSWORD_FAILURE, error});
  }
}
function* reSendConfirmationCode(action) {
  try {
    const params = {
      body: {
        ...action.params,
      },
    };

    const response = yield call(API.reSendConfirmationCode, params);
    yield put({
      type: ACTION_TYPES.RESEND_CONFIRMATION_SUCCESS,
      payload: response.data,
    });

    yield put(
      APP_ACTIONS.setNotification({
        message: I18n.t('confirmation_code_sent'),
        type: 'success',
      }),
    );
  } catch (error) {
    yield put(
      APP_ACTIONS.setNotification({
        message: error,
        type: 'error',
      }),
    );
    yield put({type: ACTION_TYPES.RESEND_CONFIRMATION_FAILURE, error});
  }
}

function* updatePassword(action) {
  try {
    const params = {
      body: {
        ...action.params,
      },
    };

    const response = yield call(API.updatePassword, params);

    if (action.params.password !== action.params.password_confirmation) {
      return yield put(
        APP_ACTIONS.setNotification({
          message: 'Password does not match',
          type: 'error',
        }),
      );
    }

    yield put({
      type: ACTION_TYPES.PASSWORD_UPDATE_SUCCESS,
      payload: response.data,
    });

    yield put(NavigationActions.back(null));
  } catch (error) {
    yield put(
      APP_ACTIONS.setNotification({
        message: error,
        type: 'error',
      }),
    );
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

function* confirmRegistrationMonitor() {
  yield takeLatest(
    ACTION_TYPES.ACCOUNT_CONFIRMATION_REQUEST,
    confirmRegistration,
  );
}
function* reSendConfirmationCodeMonitor() {
  yield takeLatest(
    ACTION_TYPES.RESEND_CONFIRMATION_REQUEST,
    reSendConfirmationCode,
  );
}

function* tokenLoginMonitor() {
  yield takeLatest(ACTION_TYPES.TOKEN_LOGIN_REQUEST, tokenLogin);
}

export const sagas = all([
  fork(loginMonitor),
  fork(tokenLoginMonitor),
  fork(logoutMonitor),
  fork(registerMonitor),
  fork(recoverPasswordMonitor),
  fork(forgotPasswordMonitor),
  fork(passwordUpdateMonitor),
  fork(confirmRegistrationMonitor),
  fork(reSendConfirmationCodeMonitor),
]);
