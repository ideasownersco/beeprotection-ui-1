import {all, call, fork, put, takeLatest} from 'redux-saga/effects';
import {API} from 'company/common/api';
import {Schema} from 'utils/schema';
import {normalize} from 'normalizr';
import {ACTION_TYPES as DRIVER_ACTIONS} from 'company/actions/drivers';
import {ACTIONS as APP_ACTIONS} from 'app/common/actions';
import I18n from 'utils/locale';

function* fetchDrivers() {
  try {
    const response = yield call(API.fetchDrivers);
    const normalized = normalize(response.data, [Schema.drivers]);

    yield put({
      type: DRIVER_ACTIONS.FETCH_DRIVERS_SUCCESS,
      entities: normalized.entities,
    });
  } catch (error) {
    yield put({type: DRIVER_ACTIONS.FETCH_DRIVERS_FAILURE, error});
  }
}

function* fetchDriver(action) {
  try {
    const response = yield call(API.fetchDriver, action.driver_id);

    if (response.working_order) {
      response.data.working_order = response.working_order;
    }

    const normalized = normalize(response.data, Schema.drivers);

    yield put({
      type: DRIVER_ACTIONS.FETCH_DRIVER_SUCCESS,
      entities: normalized.entities,
    });
  } catch (error) {
    yield put({type: DRIVER_ACTIONS.FETCH_DRIVER_FAILURE, error});
  }
}

function* assignDriver(action) {
  try {
    const params = {
      body: action.params,
    };

    const response = yield call(API.assignDriver, action.order_id,params);
    const normalized = normalize(response.data, Schema.orders);

    yield put({
      type: DRIVER_ACTIONS.ASSIGN_DRIVER_SUCCESS,
      entities: normalized.entities,
    });
    yield put(
      APP_ACTIONS.setNotification(I18n.t('driver_assigned'), 'success'),
    );
  } catch (error) {
    yield put({type: DRIVER_ACTIONS.ASSIGN_DRIVER_FAILURE, error});
    yield put(APP_ACTIONS.setNotification(error, 'error'));
  }
}

function* fetchDriverMonitor() {
  yield takeLatest(DRIVER_ACTIONS.FETCH_DRIVER_REQUEST, fetchDriver);
}

function* fetchDriversMonitor() {
  yield takeLatest(DRIVER_ACTIONS.FETCH_DRIVERS_REQUEST, fetchDrivers);
}

function* assignDriverMonitor() {
  yield takeLatest(DRIVER_ACTIONS.ASSIGN_DRIVER_REQUEST, assignDriver);
}

export const sagas = all([
  fork(fetchDriversMonitor),
  fork(fetchDriverMonitor),
  fork(assignDriverMonitor),
]);
