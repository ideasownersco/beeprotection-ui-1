import {ACTION_TYPES as DRIVER_ACTIONS} from 'driver/common/actions';
const initialState = {};

/**
 * payload
 * {
 *  latitude:'',
 *  longitude:'',
 *  job_id:'',
 *  driver_id:'',
 * }
 */

export function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case DRIVER_ACTIONS.DRIVER_LOCATION_UPDATED: {
      return {
        ...state,
        [action.payload.driver_id]: action.payload,
      };
    }

    default:
      return state;
  }
}
