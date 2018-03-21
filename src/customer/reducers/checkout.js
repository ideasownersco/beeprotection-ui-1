import {ACTION_TYPES} from 'customer/common/actions';

const initialState = {
  isFetching: false,
  orderID: null,
  error: null,
  success: false,
};

export function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case ACTION_TYPES.CHECKOUT_REQUEST:
      return {
        ...state,
        isFetching: true,
        error: null,
        success: false,
        orderID: null,
      };

    case ACTION_TYPES.CHECKOUT_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        orderID: action.orderID,
        error: null,
        success: true,
      };
    }
    case ACTION_TYPES.CHECKOUT_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error,
        success: false,
        orderID: null,
      };
    default:
      return state;
  }
}
