import {all, call, fork, put, takeLatest} from 'redux-saga/effects';
import {API} from 'driver/common/api';
import {ACTION_TYPES} from 'driver/common/actions';
import {Schema} from 'utils/schema';
import {normalize} from 'normalizr';

function* startWorking(action) {
  try {
    const params = {
      body: action.params,
    };

    const response = yield call(API.startWorking, action.job_id, params);

    const normalized = normalize(response.data, Schema.orders);

    yield put({
      type: ACTION_TYPES.START_WORKING_SUCCESS,
      entities: normalized.entities,
      result: normalized.result,
    });
  } catch (error) {
    yield put({type: ACTION_TYPES.START_WORKING_FAILURE, error});
  }
}

function* stopWorking(action) {
  try {
    const params = {
      body: action.params,
    };

    const response = yield call(API.stopWorking, action.job_id, params);
    const normalized = normalize(response.data, Schema.orders);

    yield put({
      type: ACTION_TYPES.STOP_WORKING_SUCCESS,
      entities: normalized.entities,
      result: normalized.result,
    });
  } catch (error) {
    yield put({type: ACTION_TYPES.STOP_WORKING_FAILURE, error});
  }
}

function* startDriving(action) {
  try {
    const params = {
      body: action.params,
    };

    const response = yield call(API.startDriving, action.job_id, params);

    const normalized = normalize(response.data, Schema.orders);

    yield put({
      type: ACTION_TYPES.START_DRIVING_SUCCESS,
      entities: normalized.entities,
      result: normalized.result,
    });
  } catch (error) {
    yield put({type: ACTION_TYPES.START_DRIVING_FAILURE, error});
  }
}

function* stopDriving(action) {
  try {
    const params = {
      body: action.params,
    };

    const response = yield call(API.stopDriving, action.job_id, params);
    const normalized = normalize(response.data, Schema.orders);

    yield put({
      type: ACTION_TYPES.STOP_DRIVING_SUCCESS,
      entities: normalized.entities,
      result: normalized.result,
    });
  } catch (error) {
    yield put({type: ACTION_TYPES.STOP_DRIVING_FAILURE, error});
  }
}

function* startWorkingMonitor() {
  yield takeLatest(ACTION_TYPES.START_WORKING_REQUEST, startWorking);
}

function* stopWorkingMonitor() {
  yield takeLatest(ACTION_TYPES.STOP_WORKING_REQUEST, stopWorking);
}

function* startDrivingMonitor() {
  yield takeLatest(ACTION_TYPES.START_DRIVING_REQUEST, startDriving);
}

function* stopDrivingMonitor() {
  yield takeLatest(ACTION_TYPES.STOP_DRIVING_REQUEST, stopDriving);
}

export const sagas = all([
  fork(startWorkingMonitor),
  fork(stopWorkingMonitor),
  fork(startDrivingMonitor),
  fork(stopDrivingMonitor),
]);
