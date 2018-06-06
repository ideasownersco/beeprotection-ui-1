/**
 * @flow
 */
import uuid from 'uuid/v4';

export const ACTION_TYPES = {
  CART_ADD_ITEM_REQUEST: '@customer/CART_ADD_ITEM_REQUEST',
  CART_ADD_ITEM_SUCCESS: '@customer/CART_ADD_ITEM_SUCCESS',
  CART_REMOVE_ITEM: '@customer/CART_REMOVE_ITEM',

  CART_FETCH_ITEMS_REQUEST: '@customer/CART_FETCH_ITEMS_REQUEST',
  CART_FETCH_ITEMS_SUCCESS: '@customer/CART_FETCH_ITEMS_SUCCESS',
  CART_FETCH_ITEMS_FAILURE: '@customer/CART_FETCH_ITEMS_FAILURE',

  CART_SET_ITEM: '@customer/CART_SET_ITEM',
  CART_SET_ITEMS: '@customer/CART_SET_ITEMS',
  // CART_REMOVE_ITEM: '@customer/CART_REMOVE_ITEM',

  CART_FLUSH_ITEMS: '@customer/CART_FLUSH_ITEMS',

  CATEGORY_REQUEST: '@customer/CATEGORY_REQUEST',
  CATEGORY_SUCCESS: '@customer/CATEGORY_SUCCESS',
  CATEGORY_FAILURE: '@customer/CATEGORY_FAILURE',

  TIMINGS_REQUEST: '@customer/TIMINGS_REQUEST',
  TIMINGS_SUCCESS: '@customer/TIMINGS_SUCCESS',
  TIMINGS_FAILURE: '@customer/TIMINGS_FAILURE',

  ADDRESSES_REQUEST: '@customer/ADDRESSES_REQUEST',
  ADDRESSES_SUCCESS: '@customer/ADDRESSES_SUCCESS',
  ADDRESSES_FAILURE: '@customer/ADDRESSES_FAILURE',

  AREAS_REQUEST: '@customer/AREAS_REQUEST',
  AREAS_SUCCESS: '@customer/AREAS_SUCCESS',
  AREAS_FAILURE: '@customer/AREAS_FAILURE',

  SAVE_ADDRESS_REQUEST: '@customer/SAVE_ADDRESS_REQUEST',
  SAVE_ADDRESS_SUCCESS: '@customer/SAVE_ADDRESS_SUCCESS',
  SAVE_ADDRESS_FAILURE: '@customer/SAVE_ADDRESS_FAILURE',

  UPDATE_ADDRESS_REQUEST: '@customer/UPDATE_ADDRESS_REQUEST',
  UPDATE_ADDRESS_SUCCESS: '@customer/UPDATE_ADDRESS_SUCCESS',
  UPDATE_ADDRESS_FAILURE: '@customer/UPDATE_ADDRESS_FAILURE',

  CREATE_ORDER_REQUEST: '@customer/CREATE_ORDER_REQUEST',
  CREATE_ORDER_SUCCESS: '@customer/CREATE_ORDER_SUCCESS',
  CREATE_ORDER_FAILURE: '@customer/CREATE_ORDER_FAILURE',

  CHECKOUT_REQUEST: '@customer/CHECKOUT_REQUEST',
  CHECKOUT_SUCCESS: '@customer/CHECKOUT_SUCCESS',
  CHECKOUT_FAILURE: '@customer/CHECKOUT_FAILURE',

  CREATE_PAYMENT_REQUEST: '@customer/CREATE_PAYMENT_REQUEST',
  CREATE_PAYMENT_SUCCESS: '@customer/CREATE_PAYMENT_SUCCESS',
  CREATE_PAYMENT_FAILURE: '@customer/CREATE_PAYMENT_FAILURE',

  SUBSCRIBE_TO_JOB_TRACK: '@customer/SUBSCRIBE_TO_JOB_TRACK',

  FETCH_UPCOMING_ORDERS_REQUEST: '@customer/FETCH_UPCOMING_ORDERS_REQUEST',
  FETCH_UPCOMING_ORDERS_SUCCESS: '@customer/FETCH_UPCOMING_ORDERS_SUCCESS',
  FETCH_UPCOMING_ORDERS_FAILURE: '@customer/FETCH_UPCOMING_ORDERS_FAILURE',
  FETCH_UPCOMING_ORDERS_REFRESH_REQUEST:
    '@customer/FETCH_UPCOMING_ORDERS_REFRESH_REQUEST',

  FETCH_WORKING_ORDERS_REQUEST: '@customer/FETCH_WORKING_ORDERS_REQUEST',
  FETCH_WORKING_ORDERS_SUCCESS: '@customer/FETCH_WORKING_ORDERS_SUCCESS',
  FETCH_WORKING_ORDERS_FAILURE: '@customer/FETCH_WORKING_ORDERS_FAILURE',
  FETCH_WORKING_ORDERS_REFRESH_REQUEST:
    '@customer/FETCH_UPCOMING_ORDERS_REFRESH_REQUEST',

  FETCH_PAST_ORDERS_REQUEST: '@customer/FETCH_PAST_ORDERS_REQUEST',
  FETCH_PAST_ORDERS_SUCCESS: '@customer/FETCH_PAST_ORDERS_SUCCESS',
  FETCH_PAST_ORDERS_FAILURE: '@customer/FETCH_PAST_ORDERS_FAILURE',
  FETCH_PAST_ORDERS_REFRESH_REQUEST:
    '@customer/FETCH_PAST_ORDERS_REFRESH_REQUEST',

  FETCH_ORDER_DETAILS_REQUEST: '@customer/FETCH_ORDER_DETAILS_REQUEST',
  FETCH_ORDER_DETAILS_SUCCESS: '@customer/FETCH_ORDER_DETAILS_SUCCESS',
  FETCH_ORDER_DETAILS_FAILURE: '@customer/FETCH_ORDER_DETAILS_FAILURE',

  FETCH_HAS_FREE_WASH_REQUEST: '@customer/FETCH_HAS_FREE_WASH_REQUEST',
  FETCH_HAS_FREE_WASH_SUCCESS: '@customer/FETCH_HAS_FREE_WASH_SUCCESS',
  FETCH_HAS_FREE_WASH_FAILURE: '@customer/FETCH_HAS_FREE_WASH_FAILURE',
};

function fetchCartItems() {
  return {
    type: ACTION_TYPES.CART_FETCH_ITEMS_REQUEST,
  };
}

function addToCart(item: object) {
  let id = uuid();
  return {
    type: ACTION_TYPES.CART_ADD_ITEM_SUCCESS,
    id,
    item: {
      id,
      ...item,
    },
  };
}

function setCartItem(key, value) {
  return {
    type: ACTION_TYPES.CART_SET_ITEM,
    key,
    value,
  };
}

function removeCartItem(key) {
  return {
    type: ACTION_TYPES.CART_REMOVE_ITEM,
    itemID: key,
  };
}

function flushCart() {
  return {
    type: ACTION_TYPES.CART_FLUSH_ITEMS,
  };
}

function setCartItems(params: object) {
  return {
    type: ACTION_TYPES.CART_SET_ITEMS,
    params,
  };
}

function fetchCategories(params) {
  return {
    type: ACTION_TYPES.CATEGORY_REQUEST,
    params,
  };
}

function fetchHasFreeWash(params) {
  return {
    type: ACTION_TYPES.CATEGORY_REQUEST,
    params,
  };
}

function fetchTimings(params) {
  return {
    type: ACTION_TYPES.TIMINGS_REQUEST,
    params,
  };
}

function checkout(payload) {
  return {
    type: ACTION_TYPES.CHECKOUT_REQUEST,
    payload,
  };
}

function fetchAddresses(params) {
  return {
    type: ACTION_TYPES.ADDRESSES_REQUEST,
    params,
  };
}
function fetchAreas(params) {
  return {
    type: ACTION_TYPES.AREAS_REQUEST,
    params,
  };
}

function saveAddress(payload: object) {
  return {
    type: ACTION_TYPES.SAVE_ADDRESS_REQUEST,
    payload,
  };
}

function updateAddress(payload: object) {
  return {
    type: ACTION_TYPES.UPDATE_ADDRESS_REQUEST,
    payload,
  };
}

function subscribeToOrderTracking(params) {
  return {
    type: ACTION_TYPES.SUBSCRIBE_TO_JOB_TRACK,
    params,
  };
}

function fetchUpcomingOrders(params) {
  return {
    type: ACTION_TYPES.FETCH_UPCOMING_ORDERS_REQUEST,
    params,
  };
}

function fetchUpcomingOrdersRefresh(params) {
  return {
    type: ACTION_TYPES.FETCH_UPCOMING_ORDERS_REFRESH_REQUEST,
    params,
  };
}

function fetchWorkingOrders(params) {
  return {
    type: ACTION_TYPES.FETCH_WORKING_ORDERS_REQUEST,
    params,
  };
}

function fetchWorkingOrdersRefresh(params) {
  return {
    type: ACTION_TYPES.FETCH_WORKING_ORDERS_REFRESH_REQUEST,
    params,
  };
}

function fetchPastOrders(params) {
  return {
    type: ACTION_TYPES.FETCH_PAST_ORDERS_REQUEST,
    params,
  };
}

function fetchPastOrdersRefresh(params) {
  return {
    type: ACTION_TYPES.FETCH_PAST_ORDERS_REFRESH_REQUEST,
    params,
  };
}

function fetchOrderDetails(id) {
  return {
    type: ACTION_TYPES.FETCH_ORDER_DETAILS_REQUEST,
    order_id: id,
  };
}

export const ACTIONS = {
  addToCart,
  fetchCartItems,
  setCartItem,
  removeCartItem,
  flushCart,
  fetchCategories,
  fetchHasFreeWash,
  fetchTimings,
  fetchAddresses,
  fetchAreas,
  saveAddress,
  updateAddress,
  checkout,
  setCartItems,
  subscribeToOrderTracking,
  fetchUpcomingOrders,
  fetchUpcomingOrdersRefresh,
  fetchWorkingOrders,
  fetchWorkingOrdersRefresh,
  fetchPastOrders,
  fetchPastOrdersRefresh,
  fetchOrderDetails,
};
