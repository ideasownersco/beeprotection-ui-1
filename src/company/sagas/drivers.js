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

function* assignDriver(action) {
  try {
    const response = yield call(API.assignDriver, action.params);
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

function* fetchDriversMonitor() {
  yield takeLatest(DRIVER_ACTIONS.FETCH_DRIVERS_REQUEST, fetchDrivers);
}

function* assignDriverMonitor() {
  yield takeLatest(DRIVER_ACTIONS.ASSIGN_DRIVER_REQUEST, assignDriver);
}

export const sagas = all([
  fork(fetchDriversMonitor),
  fork(assignDriverMonitor),
]);
