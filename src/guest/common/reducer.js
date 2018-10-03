import {ACTION_TYPES} from 'guest/common/actions';

const initialState = {
  isAuthenticated: false,
  id: null,
  type: 0,
  skipped: false,
  showPasswordUpdateScene: false,
  showPasswordRecoverScene: false,
  confirmationScreenVisible: false,
  confirming: false,
  login: {
    busy: false,
    error: null,
  },
  register: {
    busy: false,
    error: null,
  },
};

export function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case ACTION_TYPES.LOGIN_REQUEST:
      return {
        ...state,
        isAuthenticated: false,
        id: null,
        login: {...state.login, busy: true, error: null},
        confirmationScreenVisible: false,
      };
    case ACTION_TYPES.LOGIN_SUCCESS:
      return {
        ...state,
        error: null,
        isAuthenticated: true,
        id: action.payload.id,
        type: action.payload.type,
        login: {...state.login, busy: false, error: null},
      };
    case ACTION_TYPES.LOGIN_FAILURE:
      return {
        ...state,
        isAuthenticated: false,
        login: {...state.login, busy: false, error: action.error},
      };
    case ACTION_TYPES.REGISTER_REQUEST:
      return {
        ...state,
        register: {...state.register, busy: true, error: null},
        confirmationScreenVisible: false,
      };
    case ACTION_TYPES.REGISTER_SUCCESS:
      return {
        ...state,
        confirmationScreenVisible: true,
        register: {...state.register, busy: false, error: null},
      };
    case ACTION_TYPES.REGISTER_FAILURE:
      return {
        ...state,
        register: {...state.register, busy: false, error: action.error},
      };
    case ACTION_TYPES.LOGOUT:
      return {
        ...initialState,
      };
    case ACTION_TYPES.FORGOT_PASSWORD_SUCCESS:
      return {
        ...initialState,
        showPasswordRecoverScene: true,
        showPasswordUpdateScene: false,
      };
    case ACTION_TYPES.RECOVER_PASSWORD_SUCCESS:
      return {
        ...initialState,
        showPasswordRecoverScene: false,
        showPasswordUpdateScene: true,
      };
    case ACTION_TYPES.PASSWORD_UPDATE_SUCCESS:
      return {
        ...initialState,
        showPasswordUpdateScene: false,
        showPasswordRecoverScene: false,
      };
    case ACTION_TYPES.ACCOUNT_CONFIRMATION_REQUEST:
      return {
        ...state,
        confirming: true,
      };
    case ACTION_TYPES.ACCOUNT_CONFIRMATION_SUCCESS:
      return {
        ...state,
        confirmationScreenVisible: false,
        confirming: false,
      };
    case ACTION_TYPES.ACCOUNT_CONFIRMATION_FAILURE:
      return {
        ...state,
        confirmationScreenVisible: false,
        confirming: false,
      };

    case ACTION_TYPES.RESEND_CONFIRMATION_REQUEST:
      return {
        ...state,
        confirmationScreenVisible: false,
      };
    case ACTION_TYPES.RESEND_CONFIRMATION_SUCCESS:
      return {
        ...state,
        confirmationScreenVisible: true,
      };
    case ACTION_TYPES.RESEND_CONFIRMATION_FAILURE:
      return {
        ...state,
        confirmationScreenVisible: false,
        confirming: false,
      };
    default:
      return state;
  }
}
