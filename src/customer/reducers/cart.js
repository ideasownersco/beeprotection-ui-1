import moment from 'moment';
import {ACTION_TYPES} from 'customer/common/actions';
import {ACTION_TYPES as ORDER_ACTION_TYPES} from 'customer/common/actions';

const initialState = {
  items: {},
  total: 0,
  selectedDate: moment(),
  selectedTime: moment().format('Hm'),
  selectedAddressID: null,
  activeCategoryID: null,
  activePackageID: null,
  activeServicesIDs: [],
  // amount: 0,
};

export function reducer(state = initialState, action = {}) {

  // {
  //   return Object.keys(items)
  //     .map(item => items[item].total).reduce((total,amount) => total + amount)
  // }


  switch (action.type) {
    case ACTION_TYPES.CART_ADD_ITEM_SUCCESS: {
      return {
        ...state,
        items: {
          ...state.items,
          [action.id]: action.item,
        },
        // total: state.total + action.item.total,
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
    default:
      return state;
  }
}
