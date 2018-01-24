import {all} from 'redux-saga/effects';
import {sagas as app} from 'app/sagas/app';
import {sagas as socket} from 'app/sagas/socket';

export const sagas = all([app, socket]);
