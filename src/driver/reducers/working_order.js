import {ACTION_TYPES} from 'customer/common/actions';
import union from 'lodash/union';

const initialState = {
  isFetching: false,
  ids: null,
  error: null,
};

export function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case ACTION_TYPES.FETCH_UPCOMING_ORDERS_SUCCESS:
    case ACTION_TYPES.SAVE_ORDER_SUCCESS:
      return {
        ...state,
        ids: union(state.ids.concat(action.result)),
      };
    default:
      return state;
  }
}
