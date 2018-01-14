import {ACTION_TYPES} from 'customer/common/actions';
import union from 'lodash/union';
const initialState = {
  standingOrderIds: [],
};

export function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case ACTION_TYPES.STANDING_ORDERS_SUCCESS:
    case ACTION_TYPES.SAVE_ORDER_SUCCESS:
      return {
        ...state,
        standingOrderIds: union(state.standingOrderIds.concat(action.orderIds)),
      };
    default:
      return state;
  }
}
