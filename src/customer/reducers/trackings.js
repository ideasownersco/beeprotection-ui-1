import {ACTION_TYPES as DRIVER_ACTIONS} from 'driver/common/actions';
const initialState = {};

export function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case DRIVER_ACTIONS.DRIVER_LOCATION_UPDATED: {
      return {
        ...state,
        [action.payload.job_id]: action.payload,
      };
    }

    default:
      return state;
  }
}
