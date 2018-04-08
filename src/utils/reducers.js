import {reducer as app} from 'app/reducers/app';
import {reducer as user} from 'guest/common/reducer';
import {reducer as customer} from 'customer/reducers';
import {reducer as company} from 'company/reducers';
import {reducer as driver} from 'driver/reducers';
import {combineReducers} from 'redux';
import {reducer as entities} from 'app/reducers/entities';
import {reducer as notifications} from 'app/reducers/notifications';
import {reducer as timings} from 'app/reducers/notifications';

const rootReducer = combineReducers({
  app,
  entities,
  notifications,
  user,
  customer,
  company,
  driver,
});

export default rootReducer;
