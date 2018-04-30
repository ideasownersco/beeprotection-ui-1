import {all, call, fork, put, takeLatest, select} from 'redux-saga/effects';
import {API} from 'driver/common/api';
import {ACTION_TYPES} from 'driver/common/actions';
import {Schema} from 'utils/schema';
import {normalize} from 'normalizr';
import I18n from 'utils/locale';

function* fetchWorkingOrder() {
  try {
    const response = yield call(API.fetchWorkingOrder);
    const normalized = normalize(response.data, Schema.orders);
    yield put({
      type: ACTION_TYPES.FETCH_WORKING_ORDER_SUCCESS,
      entities: normalized.entities,
      result: normalized.result,
    });
  } catch (error) {
    yield put({type: ACTION_TYPES.FETCH_WORKING_ORDER_FAILURE, error});
  }
}

function* fetchUpcomingOrders() {
  try {
    const state = yield select();

    const {nextPage} = state.driver.upcoming_orders;

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

    const {nextPage} = state.driver.past_orders;

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

function* fetchUpcomingOrdersMonitor() {
  yield takeLatest(
    ACTION_TYPES.FETCH_UPCOMING_ORDERS_REQUEST,
    fetchUpcomingOrders,
  );
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
  fork(fetchWorkingOrderMonitor),
  fork(fetchUpcomingOrdersMonitor),
  fork(fetchPastOrdersMonitor),
  fork(fetchOrderDetailsMonitor),
]);
