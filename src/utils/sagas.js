import {sagas as APP_SAGA} from 'app/common/sagas';
import {sagas as AUTH_SAGA} from 'guest/common/sagas';
import {sagas as CUSTOMER_SAGA} from 'customer/sagas';
import {sagas as COMPANY_SAGAS} from 'company/sagas';
import {sagas as DRIVER_SAGAS} from 'driver/sagas';
import {all} from 'redux-saga/effects';

export default function* rootSaga() {
  yield all([APP_SAGA, AUTH_SAGA, CUSTOMER_SAGA, COMPANY_SAGAS, DRIVER_SAGAS]);
}
