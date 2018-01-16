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

  FETCH_UPCOMING_ORDERS_REQUEST: '@driver/FETCH_UPCOMING_ORDERS_REQUEST',
  FETCH_UPCOMING_ORDERS_SUCCESS: '@driver/FETCH_UPCOMING_ORDERS_SUCCESS',
  FETCH_UPCOMING_ORDERS_FAILURE: '@driver/FETCH_UPCOMING_ORDERS_FAILURE',

  START_JOB_REQUEST: '@driver/START_JOB_REQUEST',
  START_JOB_SUCCESS: '@driver/START_JOB_SUCCESS',
  START_JOB_FAILURE: '@driver/START_JOB_FAILURE',

  FINISH_JOB_REQUEST: '@driver/FINISH_JOB_REQUEST',
  FINISH_JOB_SUCCESS: '@driver/FINISH_JOB_SUCCESS',
  FINISH_JOB_FAILURE: '@driver/FINISH_JOB_FAILURE',
};

function fetchProfile(params) {
  return {
    type: ACTION_TYPES.FETCH_PROFILE_REQUEST,
    params,
  };
}

function fetchUpcomingOrders(params) {
  return {
    type: ACTION_TYPES.FETCH_UPCOMING_ORDERS_REQUEST,
    params,
  };
}

function saveProfile(params) {
  return {
    type: ACTION_TYPES.UPDATE_PROFILE_REQUEST,
    params,
  };
}

function startJob(params) {
  return {
    type: ACTION_TYPES.START_JOB_REQUEST,
    params,
  };
}

function finishJob(params) {
  return {
    type: ACTION_TYPES.FINISH_JOB_REQUEST,
    params,
  };
}

export const ACTIONS = {
  saveProfile,
  fetchProfile,
  fetchUpcomingOrders,
  startJob,
  finishJob
};
