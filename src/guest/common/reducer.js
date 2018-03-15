import {ACTION_TYPES} from 'guest/common/actions';

const initialState = {
  isAuthenticated: false,
  id: null,
  type: 0,
  skipped: false,
  showPasswordUpdateScene: false,
  showPasswordRecoverScene: false,
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
      };
    case ACTION_TYPES.REGISTER_SUCCESS:
      return {
        ...state,
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
    default:
      return state;
  }
}
