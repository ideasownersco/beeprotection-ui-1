import Qs from 'qs';
import {all, call, fork, put, select, takeLatest} from 'redux-saga/effects';
import {ACTION_TYPES} from 'customer/common/actions';
import {API} from 'customer/common/api';
import {Schema} from 'utils/schema';
import {normalize} from 'normalizr';
import flatten from 'lodash/flatten';

function* fetchCartItems() {
  try {
    const state = yield select();
    const {items} = state.customer.cart;
    let cartItems = Object.keys(items).map(item => items[item]);

    let categories = cartItems.map(item => item.category).join();
    let packages = cartItems.map(item => item.package).join();
    let services = flatten(
      cartItems.map(item => item.services).map(service => service),
    ).join();

    let params = {
      query: Qs.stringify({
        categories,
        packages,
        services,
      }),
    };

    const response = yield call(API.fetchCartItems, params);
    const normalized = normalize(response.data, [Schema.categories]);
    yield put({
      type: ACTION_TYPES.CART_FETCH_ITEMS_SUCCESS,
      entities: normalized.entities,
    });
  } catch (error) {
    yield put({type: ACTION_TYPES.CART_FETCH_ITEMS_FAILURE, error});
  }
}

// Monitoring Sagas
function* fetchCartItemsMonitor() {
  yield takeLatest(ACTION_TYPES.CART_FETCH_ITEMS_REQUEST, fetchCartItems);
}

export const sagas = all([fork(fetchCartItemsMonitor)]);
