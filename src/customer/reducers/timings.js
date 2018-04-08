import {ACTION_TYPES} from 'customer/common/actions';

const initialState = {
  isFetching: false,
  error: null,
};

export function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case ACTION_TYPES.TIMINGS_REQUEST:
      return {
        ...state,
        isFetching: true,
        error: null,
      };

    case ACTION_TYPES.TIMINGS_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        error: null,
      };
    }

    case ACTION_TYPES.TIMINGS_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };
    default:
      return state;
  }
}
