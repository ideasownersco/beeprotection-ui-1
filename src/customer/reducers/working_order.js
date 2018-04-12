import {ACTION_TYPES} from 'customer/common/actions';
import union from 'lodash/union';

const initialState = {
  isFetching: false,
  id: null,
  ids: [],
  error: null,
  nextPage: undefined,
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
        ids: union(state.ids, action.result),
        nextPage: action.nextPage,
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
