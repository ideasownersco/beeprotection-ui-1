import {ACTION_TYPES} from 'customer/common/actions';

const initialState = {
  isFetching: false,
  orderID: null,
  error: null,
  success:false
};

export function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case ACTION_TYPES.CREATE_ORDER_REQUEST:
      return {
        ...state,
        isFetching: true,
        error: null,
        success:false
      };

    case ACTION_TYPES.CREATE_ORDER_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        id: action.result,
        error: null,
        success:true
      };
    }

    case ACTION_TYPES.CREATE_ORDER_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error,
        success:false
      };
    default:
      return state;
  }
}
