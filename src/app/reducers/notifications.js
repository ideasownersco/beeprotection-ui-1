//@flow
import {ACTION_TYPES} from 'app/common/actions';

type MESSAGE_TYPE = 'error|success|warning';
type POSITION = 'center|top|bottom';

type State = {
  message: string,
  type: MESSAGE_TYPE,
  position: POSITION,
  backdropDismiss: boolean,
};

const initialState: State = {
  message: '',
  type: 'success',
  position: 'bottom',
  backdropDismiss: true,
};

export function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case ACTION_TYPES.SET_NOTIFICATION:
      return {
        ...state,
        ...action.payload,
      };
    case ACTION_TYPES.DISMISS_NOTIFICATION:
      return {
        ...initialState,
      };
    default:
      return state;
  }
}
