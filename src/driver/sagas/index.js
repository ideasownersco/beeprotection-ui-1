import {sagas as profile} from 'driver/sagas/profile';
import {sagas as orders} from 'driver/sagas/orders';
import {sagas as jobs} from 'driver/sagas/jobs';
import {all} from 'redux-saga/effects';

export const sagas = all([profile, orders, jobs]);
