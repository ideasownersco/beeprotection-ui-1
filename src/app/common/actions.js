export const ACTION_TYPES = {
  BOOT_REQUEST: '@app/BOOT_REQUEST',
  BOOT_SUCCESS: '@app/BOOT_SUCCESS',
  INSTALL_REQUEST: '@app/INSTALL_REQUEST',
  INSTALL_SUCCESS: '@app/INSTALL_SUCCESS',
  INSTALL_FAILED: '@app/INSTALL_FAILED',
  SET_COUNTRY_REQUEST: '@app/SET_COUNTRY_REQUEST',
  SET_COUNTRY_SUCCESS: '@app/SET_COUNTRY_SUCCESS',
  DISMISS_NOTIFICATION: '@app/DISMISS_NOTIFICATION',
  SET_NOTIFICATION: '@app/SET_NOTIFICATION',
  SET_LANGUAGE_REQUEST: '@app/SET_LANGUAGE_REQUEST',
  SET_LANGUAGE_SUCCESS: '@app/SET_LANGUAGE_SUCCESS',
  SET_PUSH_TOKEN_REQUEST: '@app/SET_PUSH_TOKEN_REQUEST',
  SET_PUSH_TOKEN_SUCCESS: '@app/SET_PUSH_TOKEN_SUCCESS',
  SET_PUSH_TOKEN_FAILURE: '@app/SET_PUSH_TOKEN_FAILURE',
};

function boot() {
  return {
    type: ACTION_TYPES.BOOT_REQUEST,
  };
}

function setCountry(country) {
  return {
    type: ACTION_TYPES.SET_COUNTRY_REQUEST,
    country,
  };
}

function setInstalled() {
  return {
    type: ACTION_TYPES.INSTALL_REQUEST,
  };
}

function setLanguage(value) {
  return {
    type: ACTION_TYPES.SET_LANGUAGE_REQUEST,
    language: value,
  };
}

function dismissNotification() {
  return {
    type: ACTION_TYPES.DISMISS_NOTIFICATION,
  };
}

function setNotification(message, messageType) {
  return {
    type: ACTION_TYPES.SET_NOTIFICATION,
    payload: {
      message: message,
      messageType: messageType,
    },
  };
}

function setPushToken(token) {
  return {
    type: ACTION_TYPES.SET_PUSH_TOKEN_REQUEST,
    params: token,
  };
}

export const ACTIONS = {
  boot,
  setCountry,
  dismissNotification,
  setNotification,
  setInstalled,
  setLanguage,
  setPushToken,
};
