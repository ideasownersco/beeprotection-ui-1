export const ACTION_TYPES = {
  LOGIN_REQUEST: '@guest/LOGIN_REQUEST',
  LOGIN_SUCCESS: '@guest/LOGIN_SUCCESS',
  LOGIN_FAILURE: '@guest/LOGIN_FAILURE',

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
};

function login(payload) {
  return {
    type: ACTION_TYPES.LOGIN_REQUEST,
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

function register(params) {
  return {
    type: ACTION_TYPES.REGISTER_REQUEST,
    params,
  };
}

export const ACTIONS = {
  login,
  register,
  logout,
  recoverPassword,
  forgotPassword,
  updatePassword,
};
