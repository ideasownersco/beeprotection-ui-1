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

function* finishWorking(action) {
  try {
    const params = {
      body: action.params,
    };

    const response = yield call(API.finishWorking, action.job_id, params);
    const normalized = normalize(response.data, Schema.orders);

    yield put({
      type: ACTION_TYPES.FINISH_WORKING_SUCCESS,
      entities: normalized.entities,
      result: normalized.result,
    });
  } catch (error) {
    yield put({type: ACTION_TYPES.FINISH_WORKING_FAILURE, error});
  }
}

function* startWorkingMonitor() {
  yield takeLatest(ACTION_TYPES.START_WORKING_REQUEST, startWorking);
}

function* finishWorkingMonitor() {
  yield takeLatest(ACTION_TYPES.FINISH_WORKING_REQUEST, finishWorking);
}

export const sagas = all([fork(startWorkingMonitor), fork(finishWorkingMonitor)]);
