import {all, call, fork, put, takeLatest} from 'redux-saga/effects';
import {ACTION_TYPES} from 'customer/common/actions';
import {API} from 'customer/common/api';
import {Schema} from 'utils/schema';
import {normalize} from 'normalizr';
import {ACTIONS as APP_ACTIONS} from 'app/common/actions';
import I18n from 'utils/locale';

function* fetchCategories() {
  try {
    const response = yield call(API.fetchCategories);
    const normalized = normalize(response.data, [Schema.categories]);
    yield put({
      type: ACTION_TYPES.CATEGORY_SUCCESS,
      entities: normalized.entities,
    });
  } catch (error) {
    yield put({type: ACTION_TYPES.CATEGORY_FAILURE, error});
  }
}

function* fetchTimings() {
  try {
    const response = yield call(API.fetchTimings);
    const normalized = normalize(response.data, [Schema.timings]);
    yield put({
      type: ACTION_TYPES.TIMINGS_SUCCESS,
      entities: normalized.entities,
    });
  } catch (error) {
    yield put({type: ACTION_TYPES.TIMINGS_FAILURE, error});
  }
}

function* fetchAddresses() {
  try {
    const response = yield call(API.fetchAddresses);
    const normalized = normalize(response.data, Schema.users);
    yield put({
      type: ACTION_TYPES.ADDRESSES_SUCCESS,
      entities: normalized.entities,
    });
  } catch (error) {
    yield put({type: ACTION_TYPES.ADDRESSES_FAILURE, error});
  }
}

function* fetchUpcomingOrders() {
  try {
    const response = yield call(API.fetchUpcomingOrders);
    const normalized = normalize(response.data, [Schema.orders]);

    let {entities, result} = normalized;

    yield put({
      type: ACTION_TYPES.STANDING_ORDERS_SUCCESS,
      entities: entities,
      orderIds: result,
    });
  } catch (error) {
    yield put({type: ACTION_TYPES.STANDING_ORDERS_FAILURE, error});
  }
}

function* fetchWorkingOrder() {
  try {
    const response = yield call(API.fetchWorkingOrder);
    const normalized = normalize(response.data, Schema.orders);
    yield put({
      type: ACTION_TYPES.FETCH_WORKING_ORDER_SUCCESS,
      entities: normalized.entities,
      id: normalized.result,
    });
  } catch (error) {
    yield put({type: ACTION_TYPES.FETCH_WORKING_ORDER_FAILURE, error});
  }
}

function* saveAddress(action) {
  try {
    const params = {
      body: {
        ...action.params,
      },
    };

    const response = yield call(API.saveAddress, params);
    const normalized = normalize(response.data, Schema.users);
    yield put({
      type: ACTION_TYPES.SAVE_ADDRESS_SUCCESS,
      entities: normalized.entities,
      address_id: response.address_id,
    });
    yield put(
      APP_ACTIONS.setNotification(I18n.t('address_save_success'), 'success'),
    );
  } catch (error) {
    yield put({type: ACTION_TYPES.SAVE_ADDRESS_FAILURE, error});
    yield put(
      APP_ACTIONS.setNotification(I18n.t('address_save_failure'), 'error'),
    );
  }
}

function* saveOrder(action) {
  try {
    const params = {
      body: {
        ...action.params,
      },
    };

    const response = yield call(API.saveOrder, params);
    const normalized = normalize(response.data, Schema.orders);
    let {entities, result} = normalized;
    yield put({
      type: ACTION_TYPES.SAVE_ORDER_SUCCESS,
      entities: entities,
      orderIds: [result],
    });
  } catch (error) {
    yield put({type: ACTION_TYPES.SAVE_ORDER_FAILURE, error});
    yield put(APP_ACTIONS.setNotification(error, 'error'));
  }
}

function* checkout(action) {
  try {
    const params = {
      body: {
        ...action.params,
      },
    };

    const response = yield call(API.checkout, params);
    const normalized = normalize(response.data, Schema.users);
    let {entities} = normalized;
    let orderIds = entities.orders ? Object.keys(entities.orders) : [];

    yield put({
      type: ACTION_TYPES.CHECKOUT_SUCCESS,
      entities: entities,
      orderIds: orderIds,
    });
  } catch (error) {
    yield put({type: ACTION_TYPES.CHECKOUT_FAILURE, error});
    yield put(APP_ACTIONS.setNotification(error, 'error'));
  }
}

// Monitoring Sagas
function* fetchCategoriesMonitor() {
  yield takeLatest(ACTION_TYPES.CATEGORY_REQUEST, fetchCategories);
}

function* fetchTimingsMonitor() {
  yield takeLatest(ACTION_TYPES.TIMINGS_REQUEST, fetchTimings);
}
function* fetchAddressesMonitor() {
  yield takeLatest(ACTION_TYPES.ADDRESSES_REQUEST, fetchAddresses);
}

function* fetchUpcomingOrdersMonitor() {
  yield takeLatest(
    ACTION_TYPES.FETCH_UPCOMING_ORDERS_REQUEST,
    fetchUpcomingOrders,
  );
}

function* saveAddressMonitor() {
  yield takeLatest(ACTION_TYPES.SAVE_ADDRESS_REQUEST, saveAddress);
}

function* saveOrderMonitor() {
  yield takeLatest(ACTION_TYPES.SAVE_ORDER_REQUEST, saveOrder);
}

function* checkoutMonitor() {
  yield takeLatest(ACTION_TYPES.CHECKOUT_REQUEST, checkout);
}

function* fetchWorkingOrderMonitor() {
  yield takeLatest(ACTION_TYPES.FETCH_WORKING_ORDER_REQUEST, fetchWorkingOrder);
}

export const sagas = all([
  fork(fetchCategoriesMonitor),
  fork(fetchTimingsMonitor),
  fork(fetchUpcomingOrdersMonitor),
  fork(fetchAddressesMonitor),
  fork(saveAddressMonitor),
  fork(saveOrderMonitor),
  fork(checkoutMonitor),
  fork(fetchWorkingOrderMonitor),
]);
