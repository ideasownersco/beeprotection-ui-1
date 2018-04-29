import {ACTION_TYPES} from 'app/common/actions';

const initialState = {
  installed: false,
  booted: false,
  language: 'en',
  has_set_language: false,
};

export function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case ACTION_TYPES.INSTALL_SUCCESS:
      return {...state, installed: action.value};
    case ACTION_TYPES.BOOT_REQUEST:
      return {...state, booted: false};
    case ACTION_TYPES.BOOT_SUCCESS:
      return {...state, booted: true};
    case ACTION_TYPES.SET_LANGUAGE_SUCCESS:
      return {
        ...state,
        language: action.language,
        has_set_language: true,
      };
    default:
      return state;
  }
}
