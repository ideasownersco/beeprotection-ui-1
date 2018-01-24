/**
 * @flow
 */

export const ACTION_TYPES = {
  UPDATE_PROFILE_REQUEST: '@driver/UPDATE_PROFILE_REQUEST',
  UPDATE_PROFILE_SUCCESS: '@driver/UPDATE_PROFILE_SUCCESS',
  UPDATE_PROFILE_FAILURE: '@driver/UPDATE_PROFILE_FAILURE',

  FETCH_PROFILE_REQUEST: '@driver/FETCH_PROFILE_REQUEST',
  FETCH_PROFILE_SUCCESS: '@driver/FETCH_PROFILE_SUCCESS',
  FETCH_PROFILE_FAILURE: '@driver/FETCH_PROFILE_FAILURE',

  START_JOB_REQUEST: '@driver/START_JOB_REQUEST',
  START_JOB_SUCCESS: '@driver/START_JOB_SUCCESS',
  START_JOB_FAILURE: '@driver/START_JOB_FAILURE',

  FINISH_JOB_REQUEST: '@driver/FINISH_JOB_REQUEST',
  FINISH_JOB_SUCCESS: '@driver/FINISH_JOB_SUCCESS',
  FINISH_JOB_FAILURE: '@driver/FINISH_JOB_FAILURE',

  FETCH_WORKING_ORDER_REQUEST: '@driver/orders/FETCH_WORKING_ORDER_REQUEST',
  FETCH_WORKING_ORDER_SUCCESS: '@driver/orders/FETCH_WORKING_ORDER_SUCCESS',
  FETCH_WORKING_ORDER_FAILURE: '@driver/orders/FETCH_WORKING_ORDER_FAILURE',

  FETCH_UPCOMING_ORDERS_REQUEST:
    '@driver/orders/FETCH_UPCOMING_ORDERS_REQUEST',
  FETCH_UPCOMING_ORDERS_SUCCESS:
    '@driver/orders/FETCH_UPCOMING_ORDERS_SUCCESS',
  FETCH_UPCOMING_ORDERS_FAILURE:
    '@driver/orders/FETCH_UPCOMING_ORDERS_FAILURE',

  FETCH_UPCOMING_ORDERS_REFRESH_REQUEST:
    '@driver/orders/FETCH_WORKING_ORDERS_REFRESH_REQUEST',

  FETCH_PAST_ORDERS_REQUEST: '@driver/orders/FETCH_PAST_ORDERS_REQUEST',
  FETCH_PAST_ORDERS_SUCCESS: '@driver/orders/FETCH_PAST_ORDERS_SUCCESS',
  FETCH_PAST_ORDERS_FAILURE: '@driver/orders/FETCH_PAST_ORDERS_FAILURE',
  FETCH_PAST_ORDERS_REFRESH_REQUEST:
    '@driver/orders/FETCH_PAST_ORDERS_REFRESH_REQUEST',



  FETCH_ORDER_DETAILS_REQUEST: '@driver/orders/FETCH_ORDER_DETAILS_REQUEST',
  FETCH_ORDER_DETAILS_SUCCESS: '@driver/orders/FETCH_ORDER_DETAILS_SUCCESS',
  FETCH_ORDER_DETAILS_FAILURE: '@driver/orders/FETCH_ORDER_DETAILS_FAILURE',
};

function fetchProfile(params) {
  return {
    type: ACTION_TYPES.FETCH_PROFILE_REQUEST,
    params,
  };
}

function fetchWorkingOrder(params) {
  return {
    type: ACTION_TYPES.FETCH_WORKING_ORDER_REQUEST,
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

function saveProfile(params) {
  return {
    type: ACTION_TYPES.UPDATE_PROFILE_REQUEST,
    params,
  };
}

function startJob(id,params = {}) {
  return {
    type: ACTION_TYPES.START_JOB_REQUEST,
    job_id:id,
    params,
  };
}

function finishJob(id,params = {}) {
  return {
    type: ACTION_TYPES.FINISH_JOB_REQUEST,
    job_id:id,
    params,
  };
}

function fetchOrderDetails(id) {
  return {
    type: ACTION_TYPES.FETCH_ORDER_DETAILS_REQUEST,
    order_id:id,
  };
}

export const ACTIONS = {
  saveProfile,
  fetchProfile,
  fetchUpcomingOrders,
  fetchUpcomingOrdersRefresh,
  fetchWorkingOrder,
  fetchPastOrders,
  fetchPastOrdersRefresh,
  startJob,
  finishJob,
  fetchOrderDetails,
};
