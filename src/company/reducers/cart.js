import {ACTION_TYPES} from 'customer/common/actions';
import moment from 'moment';

const initialState = {
  isFetching: false,
  selectedDate: moment(),
  selectedTimeID: null,
  selectedAddressID: null,
  selectedCategoryID: null,
  selectedPackageIDs: [],
  error: null,
  name: '',
  mobile: '',
  email: '',
};

export function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case ACTION_TYPES.CART_ADD_ITEM_SUCCESS: {
      return {
        ...state,
        items: {
          ...state.items,
          [action.id]: action.item,
        },
        total: state.total + action.item.amount,
      };
    }
    case ACTION_TYPES.CART_REMOVE_ITEM:
      return {
        ...state,
        error: action.error,
      };
    case ACTION_TYPES.CART_SET_ITEM:
      return {
        ...state,
        [action.key]: action.value,
      };
    case ACTION_TYPES.SAVE_ADDRESS_SUCCESS:
      return {
        ...state,
        selectedAddressID: action.address_id,
      };
    default:
      return state;
  }
}
