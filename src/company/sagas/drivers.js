import {all, call, fork, put, takeLatest} from 'redux-saga/effects';
import {API} from 'company/common/api';
import {Schema} from 'utils/schema';
import {normalize} from 'normalizr';
import {ACTION_TYPES} from 'company/common/actions';
import {ACTIONS as APP_ACTIONS} from 'app/common/actions';
import I18n from 'utils/locale';

function* fetchDrivers() {
  try {
    const response = yield call(API.fetchDrivers);
    const normalized = normalize(response.data, [Schema.drivers]);

    yield put({
      type: ACTION_TYPES.FETCH_DRIVERS_SUCCESS,
      entities: normalized.entities,
    });
  } catch (error) {
    yield put({type: ACTION_TYPES.FETCH_DRIVERS_FAILURE, error});
  }
}

function* fetchDriver(action) {
  try {
    const response = yield call(API.fetchDriver, action.driver_id);

    if (response.working_order) {
      response.data.working_order = response.working_order;
    }

    response.data.upcoming_orders = response.upcoming_orders;

    const normalized = normalize(response.data, Schema.drivers);

    yield put({
      type: ACTION_TYPES.FETCH_DRIVER_SUCCESS,
      entities: normalized.entities,
    });
  } catch (error) {
    yield put({type: ACTION_TYPES.FETCH_DRIVER_FAILURE, error});
  }
}

function* assignDriver(action) {
  try {
    const params = {
      body: action.params,
    };

    const response = yield call(API.assignDriver, action.order_id, params);
    const normalized = normalize(response.data, Schema.orders);

    yield put({
      type: ACTION_TYPES.ASSIGN_DRIVER_SUCCESS,
      entities: normalized.entities,
    });

    yield put(
      APP_ACTIONS.setNotification({
        message: I18n.t('driver_assigned'),
      }),
    );
  } catch (error) {
    yield put({type: ACTION_TYPES.ASSIGN_DRIVER_FAILURE, error});
    yield put(
      APP_ACTIONS.setNotification({
        message: error,
        type: 'error',
      }),
    );
  }
}

function* saveDriverAttributes(action) {
  try {
    const params = {
      body: action.params,
    };

    const response = yield call(API.saveDriverAttributes, params);
    const normalized = normalize(response.data, Schema.drivers);

    yield put({
      type: ACTION_TYPES.SAVE_DRIVER_ATTRIBUTES_SUCCESS,
      entities: normalized.entities,
    });
  } catch (error) {
    yield put({type: ACTION_TYPES.SAVE_DRIVER_ATTRIBUTES_FAILURE, error});
    yield put(
      APP_ACTIONS.setNotification({
        message: I18n.t('driver_status_update_failed'),
        type: 'error',
      }),
    );
  }
}

function* fetchDriverMonitor() {
  yield takeLatest(ACTION_TYPES.FETCH_DRIVER_REQUEST, fetchDriver);
}

function* fetchDriversMonitor() {
  yield takeLatest(ACTION_TYPES.FETCH_DRIVERS_REQUEST, fetchDrivers);
}

function* assignDriverMonitor() {
  yield takeLatest(ACTION_TYPES.ASSIGN_DRIVER_REQUEST, assignDriver);
}

function* saveDriverAttributesMonitor() {
  yield takeLatest(
    ACTION_TYPES.SAVE_DRIVER_ATTRIBUTES_REQUEST,
    saveDriverAttributes,
  );
}

export const sagas = all([
  fork(fetchDriversMonitor),
  fork(fetchDriverMonitor),
  fork(assignDriverMonitor),
  fork(saveDriverAttributesMonitor),
]);
