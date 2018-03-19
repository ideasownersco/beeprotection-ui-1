import {ACTION_TYPES} from 'customer/common/actions';

const initialState = {
  isFetching: false,
  orderID: null,
  error: null,
};

export function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case ACTION_TYPES.CREATE_PAYMENT_REQUEST:
      return {
        ...state,
        isFetching: true,
        error: null,
      };

    case ACTION_TYPES.CREATE_PAYMENT_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        id: action.result,
        error: null,
      };
    }

    case ACTION_TYPES.CREATE_PAYMENT_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };
    default:
      return state;
  }
}
