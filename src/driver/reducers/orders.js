import {ACTION_TYPES} from 'driver/common/actions';

const initialState = {
  upcomingOrderIDs: [],
  currentOrderID: null,
  isWorking: false,
};

export function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case ACTION_TYPES.FETCH_UPCOMING_ORDERS_SUCCESS: {
      return {
        ...state,
        upcomingOrderIDs: action.ids,
      };
    }
    default:
      return state;
  }
}
