import {all, call, fork, put, takeLatest, select} from 'redux-saga/effects';
import {ACTION_TYPES} from 'customer/common/actions';
import {ACTIONS} from 'customer/common/actions';
import {API} from 'customer/common/api';
import {Schema} from 'utils/schema';
import {normalize} from 'normalizr';
import {ACTIONS as APP_ACTIONS} from 'app/common/actions';
import I18n from 'utils/locale';
import {getStorageItem} from 'utils/functions';
import {DEVICE_UUID_KEY} from 'utils/env';

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

function* fetchTimings(action) {
  try {
    const params = {
      body: {
        ...action.params,
      },
    };

    const response = yield call(API.fetchTimings, params);
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

function* fetchAreas() {
  try {
    const response = yield call(API.fetchAreas);
    const normalized = normalize(response.data, [Schema.areas]);
    yield put({
      type: ACTION_TYPES.AREAS_SUCCESS,
      entities: normalized.entities,
    });
  } catch (error) {
    yield put({type: ACTION_TYPES.AREAS_FAILURE, error});
  }
}

function* fetchUpcomingOrders() {
  try {
    const state = yield select();

    const {nextPage} = state.customer.upcoming_orders;

    if (nextPage === null) {
      yield put({
        type: ACTION_TYPES.FETCH_UPCOMING_ORDERS_FAILURE,
        error: I18n.t('no_more_records'),
      });
    } else {
      const params = {
        paginated: !!nextPage,
        paginatedUrl: nextPage,
      };

      const response = yield call(API.fetchUpcomingOrders, params);

      const normalized = normalize(response.data, [Schema.orders]);
      const {entities, result} = normalized;

      yield put({
        type: ACTION_TYPES.FETCH_UPCOMING_ORDERS_SUCCESS,
        entities: entities,
        result: result,
        nextPage: (response.links && response.links.next) || null,
      });
    }
  } catch (error) {
    yield put({type: ACTION_TYPES.FETCH_UPCOMING_ORDERS_FAILURE, error});
  }
}

function* fetchPastOrders() {
  try {
    const state = yield select();

    const {nextPage} = state.customer.past_orders;

    if (nextPage === null) {
      yield put({
        type: ACTION_TYPES.FETCH_PAST_ORDERS_FAILURE,
        error: I18n.t('no_more_records'),
      });
    } else {
      const params = {
        paginated: !!nextPage,
        paginatedUrl: nextPage,
      };
      const response = yield call(API.fetchPastOrders, params);
      const normalized = normalize(response.data, [Schema.orders]);
      const {entities, result} = normalized;
      yield put({
        type: ACTION_TYPES.FETCH_PAST_ORDERS_SUCCESS,
        entities: entities,
        result: result,
        nextPage: (response.links && response.links.next) || null,
      });
    }
  } catch (error) {
    yield put({type: ACTION_TYPES.FETCH_PAST_ORDERS_FAILURE, error});
  }
}

function* fetchWorkingOrders(action) {
  try {
    const state = yield select();

    const {nextPage} = state.customer.working_order;

    // if(action.params.force) {
    //   yield put(ACTIONS.fetchWorkingOrdersRefresh());
    // }

    if (nextPage === null && !action.params.force) {
      yield put({
        type: ACTION_TYPES.FETCH_WORKING_ORDERS_FAILURE,
        error: I18n.t('no_more_records'),
      });
    } else {
      const params = {
        paginated: !!nextPage,
        paginatedUrl: nextPage,
      };
      const response = yield call(API.fetchWorkingOrders, params);
      const normalized = normalize(response.data, [Schema.orders]);
      const {entities, result} = normalized;
      yield put({
        type: ACTION_TYPES.FETCH_WORKING_ORDERS_SUCCESS,
        entities: entities,
        result: result,
        nextPage: (response.links && response.links.next) || null,
      });
    }
  } catch (error) {
    yield put({type: ACTION_TYPES.FETCH_WORKING_ORDERS_FAILURE, error});
  }
}

function* saveAddress(action) {
  const {address, resolve, reject} = action.payload;

  try {
    const params = {
      body: {
        ...address,
      },
    };

    const response = yield call(API.saveAddress, params);
    const normalized = normalize(response.data, Schema.users);
    yield put({
      type: ACTION_TYPES.SAVE_ADDRESS_SUCCESS,
      entities: normalized.entities,
      address_id: response.address_id,
    });
    // yield put(
    //   APP_ACTIONS.setNotification({
    //     message: I18n.t('address_save_success'),
    //   }),
    // );
    yield resolve(response.address);
  } catch (error) {
    yield put({type: ACTION_TYPES.SAVE_ADDRESS_FAILURE, error});
    yield put(
      APP_ACTIONS.setNotification({
        message: I18n.t('address_save_failure'),
        type: 'error',
      }),
    );
    yield reject(error);
  }
}

function* updateAddress(action) {
  const {address, resolve, reject} = action.payload;

  try {
    const params = {
      body: {
        ...address,
      },
    };

    const response = yield call(API.updateAddress, params);
    const normalized = normalize(response.data, Schema.users);
    yield put({
      type: ACTION_TYPES.UPDATE_ADDRESS_SUCCESS,
      entities: normalized.entities,
      address_id: response.address_id,
    });
    yield put(
      APP_ACTIONS.setNotification({
        message: I18n.t('address_save_success'),
      }),
    );
    yield resolve(response.address);
  } catch (error) {
    yield put({type: ACTION_TYPES.UPDATE_ADDRESS_FAILURE, error});
    yield put(
      APP_ACTIONS.setNotification({
        message: I18n.t('address_save_failure'),
        type: 'error',
      }),
    );
    yield reject(error);
  }
}

function* checkout(action) {
  const {item, resolve, reject} = action.payload;

  try {
    const params = {
      body: {
        ...item,
      },
    };

    const response = yield call(API.checkout, params);
    const normalized = normalize(response.data, Schema.orders);
    let {entities, result} = normalized;
    yield put({
      type: ACTION_TYPES.CHECKOUT_SUCCESS,
      entities: entities,
      orderID: result,
    });

    yield resolve(response.data);
  } catch (error) {
    yield put({type: ACTION_TYPES.CHECKOUT_FAILURE, error});
    yield put(
      APP_ACTIONS.setNotification({
        message: error,
        type: 'error',
      }),
    );

    yield reject(error);
  }
}

function* fetchOrderDetails(action) {
  try {
    const response = yield call(API.fetchOrderDetails, action.order_id);
    const normalizedOrders = normalize(response.data, Schema.orders);
    yield put({
      type: ACTION_TYPES.FETCH_ORDER_DETAILS_SUCCESS,
      entities: normalizedOrders.entities,
    });
  } catch (error) {
    yield put({type: ACTION_TYPES.FETCH_ORDER_DETAILS_FAILURE, error});
  }
}

function* fetchHasFreeWash(action) {
  try {
    const uuid = yield call(getStorageItem, DEVICE_UUID_KEY);

    let params = {
      uuid: uuid,
    };
    const response = yield call(API.fetchHasFreeWash, params);
    yield put({
      type: ACTION_TYPES.FETCH_HAS_FREE_WASH_SUCCESS,
      uuid: uuid,
    });
  } catch (error) {
    yield put({type: ACTION_TYPES.FETCH_HAS_FREE_WASH_FAILURE, error});
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

function* fetchAreasMonitor() {
  yield takeLatest(ACTION_TYPES.AREAS_REQUEST, fetchAreas);
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
function* updateAddressMonitor() {
  yield takeLatest(ACTION_TYPES.UPDATE_ADDRESS_REQUEST, updateAddress);
}

// function* createOrderMonitor() {
//   yield takeLatest(ACTION_TYPES.CREATE_ORDER_REQUEST, createOrder);
// }

function* checkoutMonitor() {
  yield takeLatest(ACTION_TYPES.CHECKOUT_REQUEST, checkout);
}

function* fetchWorkingOrdersMonitor() {
  yield takeLatest(
    ACTION_TYPES.FETCH_WORKING_ORDERS_REQUEST,
    fetchWorkingOrders,
  );
}

function* fetchPastOrdersMonitor() {
  yield takeLatest(ACTION_TYPES.FETCH_PAST_ORDERS_REQUEST, fetchPastOrders);
}

function* fetchOrderDetailsMonitor() {
  yield takeLatest(ACTION_TYPES.FETCH_ORDER_DETAILS_REQUEST, fetchOrderDetails);
}

function* fetchHasFreeWashMonitor() {
  yield takeLatest(ACTION_TYPES.FETCH_HAS_FREE_WASH_REQUEST, fetchHasFreeWash);
}

export const sagas = all([
  fork(fetchCategoriesMonitor),
  fork(fetchHasFreeWashMonitor),
  fork(fetchTimingsMonitor),
  fork(fetchAddressesMonitor),
  fork(fetchAreasMonitor),
  fork(saveAddressMonitor),
  fork(updateAddressMonitor),
  // fork(createOrderMonitor),
  fork(checkoutMonitor),
  fork(fetchWorkingOrdersMonitor),
  fork(fetchUpcomingOrdersMonitor),
  fork(fetchPastOrdersMonitor),
  fork(fetchOrderDetailsMonitor),
]);
