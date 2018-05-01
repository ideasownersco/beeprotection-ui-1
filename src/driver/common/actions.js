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

  START_WORKING_REQUEST: '@driver/START_WORKING_REQUEST',
  START_WORKING_SUCCESS: '@driver/START_WORKING_SUCCESS',
  START_WORKING_FAILURE: '@driver/START_WORKING_FAILURE',

  STOP_WORKING_REQUEST: '@driver/STOP_WORKING_REQUEST',
  STOP_WORKING_SUCCESS: '@driver/STOP_WORKING_SUCCESS',
  STOP_WORKING_FAILURE: '@driver/STOP_WORKING_FAILURE',

  START_DRIVING_REQUEST: '@driver/START_DRIVING_REQUEST',
  START_DRIVING_SUCCESS: '@driver/START_DRIVING_SUCCESS',
  START_DRIVING_FAILURE: '@driver/START_DRIVING_FAILURE',

  STOP_DRIVING_REQUEST: '@driver/STOP_DRIVING_REQUEST',
  STOP_DRIVING_SUCCESS: '@driver/STOP_DRIVING_SUCCESS',
  STOP_DRIVING_FAILURE: '@driver/STOP_DRIVING_FAILURE',

  FETCH_WORKING_ORDER_REQUEST: '@driver/FETCH_WORKING_ORDER_REQUEST',
  FETCH_WORKING_ORDER_SUCCESS: '@driver/FETCH_WORKING_ORDER_SUCCESS',
  FETCH_WORKING_ORDER_FAILURE: '@driver/FETCH_WORKING_ORDER_FAILURE',

  FETCH_UPCOMING_ORDERS_REQUEST: '@driver/FETCH_UPCOMING_ORDERS_REQUEST',
  FETCH_UPCOMING_ORDERS_SUCCESS: '@driver/FETCH_UPCOMING_ORDERS_SUCCESS',
  FETCH_UPCOMING_ORDERS_FAILURE: '@driver/FETCH_UPCOMING_ORDERS_FAILURE',

  FETCH_UPCOMING_ORDERS_REFRESH_REQUEST:
    '@driver/FETCH_WORKING_ORDERS_REFRESH_REQUEST',

  FETCH_PAST_ORDERS_REQUEST: '@driver/FETCH_PAST_ORDERS_REQUEST',
  FETCH_PAST_ORDERS_SUCCESS: '@driver/FETCH_PAST_ORDERS_SUCCESS',
  FETCH_PAST_ORDERS_FAILURE: '@driver/FETCH_PAST_ORDERS_FAILURE',
  FETCH_PAST_ORDERS_REFRESH_REQUEST:
    '@driver/FETCH_PAST_ORDERS_REFRESH_REQUEST',

  FETCH_ORDER_DETAILS_REQUEST: '@driver/FETCH_ORDER_DETAILS_REQUEST',
  FETCH_ORDER_DETAILS_SUCCESS: '@driver/FETCH_ORDER_DETAILS_SUCCESS',
  FETCH_ORDER_DETAILS_FAILURE: '@driver/FETCH_ORDER_DETAILS_FAILURE',

  FETCH_JOB_PHOTOS_REQUEST: '@driver/FETCH_JOB_PHOTOS_REQUEST',
  FETCH_JOB_PHOTOS_SUCCESS: '@driver/FETCH_JOB_PHOTOS_SUCCESS',
  FETCH_JOB_PHOTOS_FAILURE: '@driver/FETCH_JOB_PHOTOS_FAILURE',

  UPLOAD_PHOTOS_REQUEST: '@driver/UPLOAD_PHOTOS_REQUEST',
  UPLOAD_PHOTOS_SUCCESS: '@driver/UPLOAD_PHOTOS_SUCCESS',
  UPLOAD_PHOTOS_FAILURE: '@driver/UPLOAD_PHOTOS_FAILURE',

  APPROVE_PHOTOS_REQUEST: '@driver/APPROVE_PHOTOS_REQUEST',
  APPROVE_PHOTOS_SUCCESS: '@driver/APPROVE_PHOTOS_SUCCESS',
  APPROVE_PHOTOS_FAILURE: '@driver/APPROVE_PHOTOS_FAILURE',

  DRIVER_LOCATION_UPDATED: '@driver/DRIVER_LOCATION_UPDATED',
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
    // type: ACTION_TYPES.FETCH_UPCOMING_ORDERS_REFRESH_REQUEST,
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

function startWorking(id, params = {}) {
  return {
    type: ACTION_TYPES.START_WORKING_REQUEST,
    job_id: id,
    params,
  };
}

function stopWorking(id, params = {}) {
  return {
    type: ACTION_TYPES.STOP_WORKING_REQUEST,
    job_id: id,
    params,
  };
}

function startDriving(id, params = {}) {
  return {
    type: ACTION_TYPES.START_DRIVING_REQUEST,
    job_id: id,
    params,
  };
}

function stopDriving(id, params = {}) {
  return {
    type: ACTION_TYPES.STOP_DRIVING_REQUEST,
    job_id: id,
    params,
  };
}

function fetchOrderDetails(id) {
  return {
    type: ACTION_TYPES.FETCH_ORDER_DETAILS_REQUEST,
    order_id: id,
  };
}

function fetchJobPhotos(id) {
  return {
    type: ACTION_TYPES.FETCH_JOB_PHOTOS_REQUEST,
    job_id: id,
  };
}

function uploadImages(params) {
  return {
    type: ACTION_TYPES.UPLOAD_PHOTOS_REQUEST,
    params,
  };
}

function approveImages(params) {
  return {
    type: ACTION_TYPES.APPROVE_PHOTOS_REQUEST,
    params,
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
  startWorking,
  stopWorking,
  startDriving,
  stopDriving,
  fetchOrderDetails,
  fetchJobPhotos,
  uploadImages,
  approveImages,
};
