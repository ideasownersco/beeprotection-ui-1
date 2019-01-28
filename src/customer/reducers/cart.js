import moment from 'moment-timezone';
import {ACTION_TYPES} from 'customer/common/actions';
import {ACTION_TYPES as ORDER_ACTION_TYPES} from 'customer/common/actions';
moment.tz.setDefault('Asia/Kuwait');
// moment.tz.setDefault('Pacific/Honolulu');

const initialState = {
  items: {},
  total: 0,
  selectedDate: moment(),
  selectedTime: moment(),
  selectedTimeID: null,
  selectedAddressID: null,
  activeCategoryID: null,
  activePackageID: null,
  activeServicesIDs: [],
  hasFreeWash: false,
  isFreeWash: false,
  customer_name: null,
  customer_email: null,
  customer_mobile: null,
  deletedAddresses: [],
};

export function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case ACTION_TYPES.CART_ADD_ITEM_SUCCESS: {
      return {
        ...state,
        // total: 0,
        items: {
          ...state.items,
          [action.id]: action.item,
        },
      };
    }
    case ACTION_TYPES.CART_REMOVE_ITEM:
      let {[action.itemID]: itemID, ...rest} = state.items;

      return {
        ...state,
        items: rest,
        total: 0,
      };
    case ACTION_TYPES.CART_SET_ITEM:
      return {
        ...state,
        [action.key]: action.value,
      };
    case ACTION_TYPES.CART_SET_ITEMS:
      return {
        ...state,
        ...action.params,
      };
    case ORDER_ACTION_TYPES.SAVE_ADDRESS_SUCCESS:
      return {
        ...state,
        selectedAddressID: action.address_id,
      };
    case ORDER_ACTION_TYPES.DELETE_ADDRESS_SUCCESS:
      return {
        ...state,
        deletedAddresses: state.deletedAddresses.concat(action.address_id),
      };
    case ACTION_TYPES.CART_FLUSH_ITEMS:
      return {
        ...initialState,
      };
    case ACTION_TYPES.FETCH_HAS_FREE_WASH_SUCCESS:
      return {
        ...state,
        hasFreeWash: action.has_free_wash,
      };
    default:
      return state;
  }
}
