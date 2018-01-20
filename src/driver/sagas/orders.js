import {all, call, fork, put, takeLatest} from 'redux-saga/effects';
import {API} from 'driver/common/api';
import {ACTION_TYPES} from 'driver/common/actions';
import {Schema} from 'utils/schema';
import {normalize} from 'normalizr';

function* fetchCurrentJob() {
  try {
    const response = yield call(API.fetchCurrentJob);
    const normalized = normalize(response.data, Schema.jobs);
    yield put({
      type: ACTION_TYPES.FETCH_CURRENT_JOB_SUCCESS,
      entities: normalized.entities,
      id: normalized.result,
    });
  } catch (error) {
    yield put({type: ACTION_TYPES.FETCH_CURRENT_JOB_FAILURE, error});
  }
}

function* fetchUpcomingOrders() {
  try {
    const response = yield call(API.fetchUpcomingOrders);
    const normalized = normalize(response.data, [Schema.orders]);
    yield put({
      type: ACTION_TYPES.FETCH_UPCOMING_ORDERS_SUCCESS,
      entities: normalized.entities,
      ids: normalized.result,
    });
  } catch (error) {
    yield put({type: ACTION_TYPES.FETCH_UPCOMING_ORDERS_FAILURE, error});
  }
}

function* fetchUpcomingOrdersMonitor() {
  yield takeLatest(
    ACTION_TYPES.FETCH_UPCOMING_ORDERS_REQUEST,
    fetchUpcomingOrders,
  );
}

function* fetchCurrentJobMonitor() {
  yield takeLatest(
    ACTION_TYPES.FETCH_CURRENT_JOB_REQUEST,
    fetchCurrentJob,
  );
}

export const sagas = all([fork(fetchCurrentJobMonitor)]);
