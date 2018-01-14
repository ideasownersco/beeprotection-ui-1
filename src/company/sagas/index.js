import {sagas as orders} from 'company/sagas/orders';
import {sagas as drivers} from 'company/sagas/drivers';
import {all} from 'redux-saga/effects';

export const sagas = all([orders, drivers]);
