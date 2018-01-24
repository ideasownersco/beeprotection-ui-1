import {combineReducers} from 'redux';
import {reducer as profile} from 'driver/reducers/profile';
import {reducer as working_order} from 'driver/reducers/working_order';
import {reducer as upcoming_orders} from 'driver/reducers/upcoming_orders';
import {reducer as past_orders} from 'driver/reducers/past_orders';

export const reducer = combineReducers({
  profile,
  working_order,
  upcoming_orders,
  past_orders,
});
