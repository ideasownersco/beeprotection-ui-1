import {sagas as cart} from 'customer/sagas/cart';
import {sagas as orders} from 'customer/sagas/orders';
import {all} from 'redux-saga/effects';

export const sagas = all([cart, orders]);
