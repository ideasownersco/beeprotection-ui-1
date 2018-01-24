import {all, call, fork, put, takeLatest, select} from 'redux-saga/effects';
import {ACTION_TYPES as ORDER_ACTION_TYPES} from 'company/actions/orders';
import {API} from 'company/common/api';
import {Schema} from 'utils/schema';
import {normalize} from 'normalizr';
import I18n from 'utils/locale';

function* fetchUpcomingOrders() {
  try {
    const state = yield select();

    const {nextPage} = state.company.upcoming_orders;

    if (nextPage === null) {
      yield put({
        type: ORDER_ACTION_TYPES.FETCH_UPCOMING_ORDERS_FAILURE,
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
        type: ORDER_ACTION_TYPES.FETCH_UPCOMING_ORDERS_SUCCESS,
        entities: entities,
        result: result,
        nextPage: (response.links && response.links.next) || null,
      });
    }
  } catch (error) {
    yield put({type: ORDER_ACTION_TYPES.FETCH_UPCOMING_ORDERS_FAILURE, error});
  }
}

function* fetchWorkingOrders() {
  try {
    const state = yield select();

    const {nextPage} = state.company.working_orders;

    if (nextPage === null) {
      yield put({
        type: ORDER_ACTION_TYPES.FETCH_WORKING_ORDERS_FAILURE,
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
      console.log('fetchWorkingOrders', normalized);
      yield put({
        type: ORDER_ACTION_TYPES.FETCH_WORKING_ORDERS_SUCCESS,
        entities: entities,
        result: result,
        nextPage: (response.links && response.links.next) || null,
      });
    }
  } catch (error) {
    yield put({type: ORDER_ACTION_TYPES.FETCH_WORKING_ORDERS_FAILURE, error});
  }
}

function* fetchPastOrders() {
  try {
    const state = yield select();

    const {nextPage} = state.company.past_orders;

    if (nextPage === null) {
      yield put({
        type: ORDER_ACTION_TYPES.FETCH_PAST_ORDERS_FAILURE,
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
        type: ORDER_ACTION_TYPES.FETCH_PAST_ORDERS_SUCCESS,
        entities: entities,
        result: result,
        nextPage: (response.links && response.links.next) || null,
      });
    }
  } catch (error) {
    yield put({type: ORDER_ACTION_TYPES.FETCH_PAST_ORDERS_FAILURE, error});
  }
}

function* fetchOrderDetails(action) {
  try {
    const response = yield call(API.fetchOrderDetails, action.params.order_id);
    const normalizedOrders = normalize(response.data, Schema.orders);
    yield put({
      type: ORDER_ACTION_TYPES.FETCH_ORDER_DETAILS_SUCCESS,
      entities: normalizedOrders.entities,
    });
  } catch (error) {
    yield put({type: ORDER_ACTION_TYPES.FETCH_ORDER_DETAILS_FAILURE, error});
  }
}

function* fetchUpcomingOrdersMonitor() {
  yield takeLatest(
    ORDER_ACTION_TYPES.FETCH_UPCOMING_ORDERS_REQUEST,
    fetchUpcomingOrders,
  );
}

function* fetchWorkingOrdersMonitor() {
  yield takeLatest(
    ORDER_ACTION_TYPES.FETCH_WORKING_ORDERS_REQUEST,
    fetchWorkingOrders,
  );
}

function* fetchPastOrdersMonitor() {
  yield takeLatest(
    ORDER_ACTION_TYPES.FETCH_PAST_ORDERS_REQUEST,
    fetchPastOrders,
  );
}

function* fetchOrderDetailsMonitor() {
  yield takeLatest(
    ORDER_ACTION_TYPES.FETCH_ORDER_DETAILS_REQUEST,
    fetchOrderDetails,
  );
}

export const sagas = all([
  fork(fetchUpcomingOrdersMonitor),
  fork(fetchWorkingOrdersMonitor),
  fork(fetchPastOrdersMonitor),
  fork(fetchOrderDetailsMonitor),
]);
