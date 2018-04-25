import {combineReducers} from 'redux';
import {reducer as cart} from 'customer/reducers/cart';
import {reducer as trackings} from 'customer/reducers/trackings';
import {reducer as working_order} from 'customer/reducers/working_order';
import {reducer as upcoming_orders} from 'customer/reducers/upcoming_orders';
import {reducer as past_orders} from 'customer/reducers/past_orders';
import {reducer as payment} from 'customer/reducers/payment';
import {reducer as checkout} from 'customer/reducers/checkout';
import {reducer as order} from 'customer/reducers/order';
import {reducer as timings} from 'customer/reducers/timings';

export const reducer = combineReducers({
  cart,
  working_order,
  upcoming_orders,
  past_orders,
  trackings,
  payment,
  checkout,
  timings,
  order,
});
