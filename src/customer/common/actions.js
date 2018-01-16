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

  CATEGORY_REQUEST: '@customer/CATEGORY_REQUEST',
  CATEGORY_SUCCESS: '@customer/CATEGORY_SUCCESS',
  CATEGORY_FAILURE: '@customer/CATEGORY_FAILURE',

  TIMINGS_REQUEST: '@customer/TIMINGS_REQUEST',
  TIMINGS_SUCCESS: '@customer/TIMINGS_SUCCESS',
  TIMINGS_FAILURE: '@customer/TIMINGS_FAILURE',

  ADDRESSES_REQUEST: '@customer/ADDRESSES_REQUEST',
  ADDRESSES_SUCCESS: '@customer/ADDRESSES_SUCCESS',
  ADDRESSES_FAILURE: '@customer/ADDRESSES_FAILURE',

  SAVE_ADDRESS_REQUEST: '@customer/SAVE_ADDRESS_REQUEST',
  SAVE_ADDRESS_SUCCESS: '@customer/SAVE_ADDRESS_SUCCESS',
  SAVE_ADDRESS_FAILURE: '@customer/SAVE_ADDRESS_FAILURE',

  SAVE_ORDER_REQUEST: '@customer/SAVE_ORDER_REQUEST',
  SAVE_ORDER_SUCCESS: '@customer/SAVE_ORDER_SUCCESS',
  SAVE_ORDER_FAILURE: '@customer/SAVE_ORDER_FAILURE',

  STANDING_ORDERS_REQUEST: '@customer/STANDING_ORDERS_REQUEST',
  STANDING_ORDERS_SUCCESS: '@customer/STANDING_ORDERS_SUCCESS',
  STANDING_ORDERS_FAILURE: '@customer/STANDING_ORDERS_FAILURE',

  CHECKOUT_REQUEST: '@customer/CHECKOUT_REQUEST',
  CHECKOUT_SUCCESS: '@customer/CHECKOUT_SUCCESS',
  CHECKOUT_FAILURE: '@customer/CHECKOUT_FAILURE',

  LOCATION_RECEIVED: '@customer/LOCATION_RECEIVED'
};

function fetchCartItems() {
  return {
    type: ACTION_TYPES.CART_FETCH_ITEMS_REQUEST,
  };
}

function addToCart(item: object) {
  return {
    type: ACTION_TYPES.CART_ADD_ITEM_SUCCESS,
    id: uuid(),
    item,
  };
}

function removeFromCart(item: string) {
  return {
    type: ACTION_TYPES.CART_REMOVE_ITEM,
    item,
  };
}

function setCartItem(key, value) {
  return {
    type: ACTION_TYPES.CART_SET_ITEM,
    key,
    value,
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

function fetchStandingOrders(params) {
  return {
    type: ACTION_TYPES.STANDING_ORDERS_REQUEST,
    params,
  };
}

function fetchTimings(params) {
  return {
    type: ACTION_TYPES.TIMINGS_REQUEST,
    params,
  };
}

function checkout(params) {
  return {
    type: ACTION_TYPES.CHECKOUT_REQUEST,
    params,
  };
}

function saveOrder(params) {
  return {
    type: ACTION_TYPES.SAVE_ORDER_REQUEST,
    params,
  };
}

function fetchAddresses(params) {
  return {
    type: ACTION_TYPES.ADDRESSES_REQUEST,
    params,
  };
}

function saveAddress(address: object) {
  return {
    type: ACTION_TYPES.SAVE_ADDRESS_REQUEST,
    address,
  };
}

function locationReceived(location:object) {
  return {
    type:ACTION_TYPES.LOCATION_RECEIVED,
    payload:location
  }
}

export const ACTIONS = {
  addToCart,
  fetchCartItems,
  setCartItem,
  fetchCategories,
  fetchTimings,
  fetchAddresses,
  saveAddress,
  saveOrder,
  fetchStandingOrders,
  checkout,
  setCartItems,
  locationReceived
};
