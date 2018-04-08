import {all, call, fork, put, takeLatest, select} from 'redux-saga/effects';
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

function* fetchTimings(action) {

  try {

    const params = {
      body: {
        ...action.params,
      },
    };

    const response = yield call(API.fetchTimings,params);
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

function* fetchWorkingOrder() {
  try {
    const state = yield select();

    const {nextPage} = state.customer.working_order;

    if (nextPage === null) {
      yield put({
        type: ACTION_TYPES.FETCH_WORKING_ORDER_FAILURE,
        error: I18n.t('no_more_records'),
      });
    } else {
      const params = {
        paginated: !!nextPage,
        paginatedUrl: nextPage,
      };
      const response = yield call(API.fetchWorkingOrder, params);
      const normalized = normalize(response.data, [Schema.orders]);
      const {entities, result} = normalized;
      yield put({
        type: ACTION_TYPES.FETCH_WORKING_ORDER_SUCCESS,
        entities: entities,
        result: result,
        nextPage: (response.links && response.links.next) || null,
      });
    }
  } catch (error) {
    yield put({type: ACTION_TYPES.FETCH_WORKING_ORDER_FAILURE, error});
  }
}


// function* fetchWorkingOrder() {
//   try {
//     const response = yield call(API.fetchWorkingOrder);
//
//     if (response.data) {
//       const normalized = normalize(response.data, [Schema.orders]);
//       yield put({
//         type: ACTION_TYPES.FETCH_WORKING_ORDER_SUCCESS,
//         entities: normalized.entities,
//         result: normalized.result,
//       });
//     } else {
//       yield put({
//         type: ACTION_TYPES.FETCH_WORKING_ORDER_SUCCESS,
//       });
//     }
//   } catch (error) {
//     yield put({type: ACTION_TYPES.FETCH_WORKING_ORDER_FAILURE, error});
//   }
// }

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
      APP_ACTIONS.setNotification({
        message: I18n.t('address_save_success'),
      }),
    );
  } catch (error) {
    yield put({type: ACTION_TYPES.SAVE_ADDRESS_FAILURE, error});
    yield put(
      APP_ACTIONS.setNotification({
        message: I18n.t('address_save_failure'),
        type: 'error',
      }),
    );
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

// function* checkout(action) {
//   try {
//     const params = {
//       body: {
//         ...action.params,
//       },
//     };
//
//     const response = yield call(API.checkout, params);
//     const normalized = normalize(response.data, Schema.users);
//     let {entities} = normalized;
//     let orderIds = entities.orders ? Object.keys(entities.orders) : [];
//     console.log('normalized',normalized);
//
//     console.log('orderIds',orderIds);
//
//     yield put({
//       type: ACTION_TYPES.CHECKOUT_SUCCESS,
//       entities: entities,
//       orderIds: orderIds,
//     });
//   } catch (error) {
//     yield put({type: ACTION_TYPES.CHECKOUT_FAILURE, error});
//     yield put(APP_ACTIONS.setNotification({
//       message:error,
//       type:'error'
//     }));
//   }
// }

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

// function* createOrderMonitor() {
//   yield takeLatest(ACTION_TYPES.CREATE_ORDER_REQUEST, createOrder);
// }

function* checkoutMonitor() {
  yield takeLatest(ACTION_TYPES.CHECKOUT_REQUEST, checkout);
}

function* fetchWorkingOrderMonitor() {
  yield takeLatest(ACTION_TYPES.FETCH_WORKING_ORDER_REQUEST, fetchWorkingOrder);
}

function* fetchPastOrdersMonitor() {
  yield takeLatest(ACTION_TYPES.FETCH_PAST_ORDERS_REQUEST, fetchPastOrders);
}

function* fetchOrderDetailsMonitor() {
  yield takeLatest(ACTION_TYPES.FETCH_ORDER_DETAILS_REQUEST, fetchOrderDetails);
}

export const sagas = all([
  fork(fetchCategoriesMonitor),
  fork(fetchTimingsMonitor),
  fork(fetchAddressesMonitor),
  fork(saveAddressMonitor),
  // fork(createOrderMonitor),
  fork(checkoutMonitor),
  fork(fetchWorkingOrderMonitor),
  fork(fetchUpcomingOrdersMonitor),
  fork(fetchPastOrdersMonitor),
  fork(fetchOrderDetailsMonitor),
]);
