export const ACTION_TYPES = {
  LOGIN_REQUEST: '@guest/LOGIN_REQUEST',
  LOGIN_SUCCESS: '@guest/LOGIN_SUCCESS',
  LOGIN_FAILURE: '@guest/LOGIN_FAILURE',

  TOKEN_LOGIN_REQUEST: '@guest/TOKEN_LOGIN_REQUEST',
  TOKEN_LOGIN_SUCCESS: '@guest/TOKEN_LOGIN_SUCCESS',
  TOKEN_LOGIN_FAILURE: '@guest/TOKEN_LOGIN_FAILURE',

  REGISTER_REQUEST: '@guest/REGISTER_REQUEST',
  REGISTER_SUCCESS: '@guest/REGISTER_SUCCESS',
  REGISTER_FAILURE: '@guest/REGISTER_FAILURE',

  FORGOT_PASSWORD_REQUEST: '@guest/FORGOT_PASSWORD_REQUEST',
  FORGOT_PASSWORD_SUCCESS: '@guest/FORGOT_PASSWORD_SUCCESS',
  FORGOT_PASSWORD_FAILURE: '@guest/FORGOT_PASSWORD_FAILURE',

  RECOVER_PASSWORD_REQUEST: '@guest/RECOVER_PASSWORD_REQUEST',
  RECOVER_PASSWORD_SUCCESS: '@guest/RECOVER_PASSWORD_SUCCESS',
  RECOVER_PASSWORD_FAILURE: '@guest/RECOVER_PASSWORD_FAILURE',

  PASSWORD_UPDATE_REQUEST: '@user/PASSWORD_UPDATE_REQUEST',
  PASSWORD_UPDATE_SUCCESS: '@user/PASSWORD_UPDATE_SUCCESS',
  PASSWORD_UPDATE_FAILURE: '@user/PASSWORD_UPDATE_FAILURE',
  LOGOUT: '@user/LOGOUT',
  SET_AUTH_TOKEN: '@user/SET_AUTH_TOKEN',

  SYNC_USER_TO_SOCKET: '@user/SYNC_USER_TO_SOCKET',

  ACCOUNT_CONFIRMATION_REQUEST: '@guest/ACCOUNT_CONFIRMATION_REQUEST',
  ACCOUNT_CONFIRMATION_SUCCESS: '@guest/ACCOUNT_CONFIRMATION_SUCCESS',
  ACCOUNT_CONFIRMATION_FAILURE: '@guest/ACCOUNT_CONFIRMATION_FAILURE',

  RESEND_CONFIRMATION_REQUEST: '@guest/RESEND_CONFIRMATION_REQUEST',
  RESEND_CONFIRMATION_SUCCESS: '@guest/RESEND_CONFIRMATION_SUCCESS',
  RESEND_CONFIRMATION_FAILURE: '@guest/RESEND_CONFIRMATION_FAILURE',
};

function login(payload) {
  return {
    type: ACTION_TYPES.LOGIN_REQUEST,
    payload,
  };
}

function tokenLogin(payload) {
  return {
    type: ACTION_TYPES.TOKEN_LOGIN_REQUEST,
    payload,
  };
}

function register(payload) {
  return {
    type: ACTION_TYPES.REGISTER_REQUEST,
    payload,
  };
}

function logout() {
  return {
    type: ACTION_TYPES.LOGOUT,
  };
}

function forgotPassword(params) {
  return {
    type: ACTION_TYPES.FORGOT_PASSWORD_REQUEST,
    params,
  };
}

function recoverPassword(params) {
  return {
    type: ACTION_TYPES.RECOVER_PASSWORD_REQUEST,
    params,
  };
}
function updatePassword(params) {
  return {
    type: ACTION_TYPES.PASSWORD_UPDATE_REQUEST,
    params,
  };
}

function confirmRegistration(params) {
  return {
    type: ACTION_TYPES.ACCOUNT_CONFIRMATION_REQUEST,
    params,
  };
}

function reSendConfirmationCode(params) {
  return {
    type: ACTION_TYPES.RESEND_CONFIRMATION_REQUEST,
    params,
  };
}

export const ACTIONS = {
  login,
  tokenLogin,
  register,
  logout,
  recoverPassword,
  forgotPassword,
  updatePassword,
  confirmRegistration,
  reSendConfirmationCode,
};
