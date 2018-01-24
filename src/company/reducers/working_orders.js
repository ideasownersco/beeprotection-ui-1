import {ACTION_TYPES} from 'company/common/actions';
import union from 'lodash/union';

const initialState = {
  isFetching: false,
  ids: [],
  nextPage: undefined,
  error: null,
};

export function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case ACTION_TYPES.FETCH_WORKING_ORDERS_REQUEST:
      return {
        ...state,
        isFetching: true,
        error: null,
      };

    case ACTION_TYPES.FETCH_WORKING_ORDERS_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        ids: union(state.ids, action.result),
        nextPage: action.nextPage,
        error: null,
      };
    }

    case ACTION_TYPES.FETCH_WORKING_ORDERS_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };

    case ACTION_TYPES.FETCH_WORKING_ORDERS_REFRESH_REQUEST:
      return {
        ...state,
        nextPage: undefined,
      };

    default:
      return state;
  }
}
