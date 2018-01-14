export const ACTION_TYPES = {
  STANDING_ORDERS_REQUEST: '@company/orders/STANDING_ORDERS_REQUEST',
  STANDING_ORDERS_SUCCESS: '@company/orders/STANDING_ORDERS_SUCCESS',
  STANDING_ORDERS_FAILURE: '@company/orders/STANDING_ORDERS_FAILURE',

  FETCH_ORDER_DETAILS_REQUEST: '@company/orders/FETCH_ORDER_DETAILS_REQUEST',
  FETCH_ORDER_DETAILS_SUCCESS: '@company/orders/FETCH_ORDER_DETAILS_SUCCESS',
  FETCH_ORDER_DETAILS_FAILURE: '@company/orders/FETCH_ORDER_DETAILS_FAILURE',
};

function fetchStandingOrders(params) {
  return {
    type: ACTION_TYPES.STANDING_ORDERS_REQUEST,
    params,
  };
}

function fetchOrderDetails(params) {
  return {
    type: ACTION_TYPES.FETCH_ORDER_DETAILS_REQUEST,
    params,
  };
}

export const ACTIONS = {
  fetchStandingOrders,
  fetchOrderDetails,
};
