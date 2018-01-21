import {ACTION_TYPES} from 'driver/common/actions';

const initialState = {
  upcomingOrderIDs: [],
  workingOrderID: null,
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
    case ACTION_TYPES.FETCH_WORKING_ORDER_SUCCESS: {
      return {
        ...state,
        workingOrderID: action.id,
      };
    }
    case ACTION_TYPES.START_JOB_SUCCESS: {
      return {
        ...state,
        isWorking: true,
      };
    }
    case ACTION_TYPES.FINISH_JOB_SUCCESS: {
      return {
        ...state,
        workingOrderID: null,
        isWorking: false,
      };
    }
    default:
      return state;
  }
}
