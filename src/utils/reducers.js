import {reducer as app, entities} from 'app/common/reducer';
import {reducer as user} from 'guest/common/reducer';
import {reducer as customer} from 'customer/reducers';
import {reducer as company} from 'company/reducers';
import {reducer as driver} from 'driver/reducers';
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
  app,
  entities,
  user,
  customer,
  company,
  driver,
});

export default rootReducer;
