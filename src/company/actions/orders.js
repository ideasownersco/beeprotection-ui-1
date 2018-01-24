export const ACTION_TYPES = {
  FETCH_WORKING_ORDERS_REQUEST: '@company/orders/FETCH_WORKING_ORDERS_REQUEST',
  FETCH_WORKING_ORDERS_SUCCESS: '@company/orders/FETCH_WORKING_ORDERS_SUCCESS',
  FETCH_WORKING_ORDERS_FAILURE: '@company/orders/FETCH_WORKING_ORDERS_FAILURE',
  FETCH_WORKING_ORDERS_REFRESH_REQUEST:
    '@company/orders/FETCH_WORKING_ORDERS_REFRESH_REQUEST',

  FETCH_UPCOMING_ORDERS_REQUEST:
    '@company/orders/FETCH_UPCOMING_ORDERS_REQUEST',
  FETCH_UPCOMING_ORDERS_SUCCESS:
    '@company/orders/FETCH_UPCOMING_ORDERS_SUCCESS',
  FETCH_UPCOMING_ORDERS_FAILURE:
    '@company/orders/FETCH_UPCOMING_ORDERS_FAILURE',

  FETCH_UPCOMING_ORDERS_REFRESH_REQUEST:
    '@company/orders/FETCH_WORKING_ORDERS_REFRESH_REQUEST',

  FETCH_PAST_ORDERS_REQUEST: '@company/orders/FETCH_PAST_ORDERS_REQUEST',
  FETCH_PAST_ORDERS_SUCCESS: '@company/orders/FETCH_PAST_ORDERS_SUCCESS',
  FETCH_PAST_ORDERS_FAILURE: '@company/orders/FETCH_PAST_ORDERS_FAILURE',
  FETCH_PAST_ORDERS_REFRESH_REQUEST:
    '@company/orders/FETCH_PAST_ORDERS_REFRESH_REQUEST',

  FETCH_ORDER_DETAILS_REQUEST: '@company/orders/FETCH_ORDER_DETAILS_REQUEST',
  FETCH_ORDER_DETAILS_SUCCESS: '@company/orders/FETCH_ORDER_DETAILS_SUCCESS',
  FETCH_ORDER_DETAILS_FAILURE: '@company/orders/FETCH_ORDER_DETAILS_FAILURE',
};

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
  fetchWorkingOrders,
  fetchWorkingOrdersRefresh,
  fetchUpcomingOrders,
  fetchUpcomingOrdersRefresh,
  fetchPastOrders,
  fetchPastOrdersRefresh,
  fetchOrderDetails,
};
