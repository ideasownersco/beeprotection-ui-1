import {all, call, fork, put, takeLatest} from 'redux-saga/effects';
import {ACTION_TYPES as ORDER_ACTION_TYPES} from 'company/actions/orders';
import {API} from 'company/common/api';
import {Schema} from 'utils/schema';
import {normalize} from 'normalizr';

function* fetchStandingOrders() {
  try {
    const response = yield call(API.fetchStandingOrders);
    const normalizedOrders = normalize(response.data, [Schema.orders]);
    const orderIds =
      (response.data.length && Object.keys(normalizedOrders.entities.orders)) ||
      [];

    yield put({
      type: ORDER_ACTION_TYPES.STANDING_ORDERS_SUCCESS,
      entities: {
        ...normalizedOrders.entities,
      },
      orderIds,
    });
  } catch (error) {
    yield put({type: ORDER_ACTION_TYPES.STANDING_ORDERS_FAILURE, error});
  }
}

function* fetchOrderDetails(action) {
  try {
    const response = yield call(API.fetchOrderDetails, action.params);
    const normalizedOrders = normalize(response.data, Schema.orders);
    yield put({
      type: ORDER_ACTION_TYPES.FETCH_ORDER_DETAILS_SUCCESS,
      entities: normalizedOrders.entities,
    });
  } catch (error) {
    yield put({type: ORDER_ACTION_TYPES.FETCH_ORDER_DETAILS_FAILURE, error});
  }
}

function* fetchStandingOrdersMonitor() {
  yield takeLatest(
    ORDER_ACTION_TYPES.STANDING_ORDERS_REQUEST,
    fetchStandingOrders,
  );
}
function* fetchOrderDetailsMonitor() {
  yield takeLatest(
    ORDER_ACTION_TYPES.FETCH_ORDER_DETAILS_REQUEST,
    fetchOrderDetails,
  );
}

export const sagas = all([
  fork(fetchStandingOrdersMonitor),
  fork(fetchOrderDetailsMonitor),
]);
