import {ACTION_TYPES} from 'driver/common/actions';

const initialState = {
  isFetching: false,
  id: null,
  error: null,
};

export function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case ACTION_TYPES.FETCH_WORKING_ORDER_REQUEST:
      return {
        ...state,
        isFetching: true,
        error: null,
      };

    case ACTION_TYPES.FETCH_WORKING_ORDER_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        id: action.result,
        error: null,
      };
    }

    case ACTION_TYPES.FETCH_WORKING_ORDER_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };
    case ACTION_TYPES.START_WORKING_SUCCESS: {
      return {
        ...state,
        id: action.result,
      };
    }
    case ACTION_TYPES.STOP_WORKING_SUCCESS: {
      return {
        ...state,
        id: null,
      };
    }
    default:
      return state;
  }
}
