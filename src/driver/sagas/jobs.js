import {all, call, fork, put, takeLatest} from 'redux-saga/effects';
import {API} from 'driver/common/api';
import {ACTION_TYPES} from 'driver/common/actions';
import {Schema} from 'utils/schema';
import {normalize} from 'normalizr';

function* startJob(action) {
  try {

    const params = {
      body:action.params
    };

    const response = yield call(
      API.startJob,
      action.job_id,
      params
    );

    const normalized = normalize(response.data, Schema.jobs);

    yield put({
      type: ACTION_TYPES.START_JOB_SUCCESS,
      entities: normalized.entities,
    });
  } catch (error) {
    yield put({type: ACTION_TYPES.START_JOB_FAILURE, error});
  }
}

function* finishJob(action) {
  try {

    const params = {
      body:action.params
    };

    const response = yield call(
      API.finishJob,
      action.job_id,
      params,
    );
    const normalized = normalize(response.data, Schema.jobs);

    yield put({
      type: ACTION_TYPES.FINISH_JOB_SUCCESS,
      entities: normalized.entities,
    });
  } catch (error) {
    yield put({type: ACTION_TYPES.FINISH_JOB_FAILURE, error});
  }
}

function* startJobMonitor() {
  yield takeLatest(ACTION_TYPES.START_JOB_REQUEST, startJob);
}

function* finishJobMonitor() {
  yield takeLatest(ACTION_TYPES.FINISH_JOB_REQUEST, finishJob);
}

export const sagas = all([fork(startJobMonitor), fork(finishJobMonitor)]);
