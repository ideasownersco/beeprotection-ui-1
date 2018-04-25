import {ACTION_TYPES} from 'customer/common/actions';

const initialState = {
  isFetching: false,
  error: null,
  success: false,
};

export function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case ACTION_TYPES.FETCH_ORDER_DETAILS_REQUEST:
      return {
        ...state,
        isFetching: true,
        error: null,
        success: false,
      };

    case ACTION_TYPES.FETCH_ORDER_DETAILS_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        error: null,
        success: true,
      };
    }
    case ACTION_TYPES.FETCH_ORDER_DETAILS_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error,
        success: false,
      };
    default:
      return state;
  }
}
