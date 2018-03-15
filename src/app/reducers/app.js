import {ACTION_TYPES} from 'app/common/actions';

const initialState = {
  installed: false,
  booted: false,
};

export function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case ACTION_TYPES.INSTALL_SUCCESS:
      return {...state, installed: action.value};
    case ACTION_TYPES.BOOT_REQUEST:
      return {...state, booted: false};
    case ACTION_TYPES.BOOT_SUCCESS:
      return {...state, booted: true};
    default:
      return state;
  }
}
