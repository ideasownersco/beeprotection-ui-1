import {ACTION_TYPES} from 'customer/common/actions';
import union from 'lodash/union';
const initialState = {};

export function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case ACTION_TYPES.DRIVER_LOCATION_UPDATED: {
      return {
        ...state,
        [action.payload.jobID]: action.payload.location,
      };
    }

    default:
      return state;
  }
}
