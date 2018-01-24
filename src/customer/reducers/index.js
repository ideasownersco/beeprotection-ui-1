import {combineReducers} from 'redux';
import {reducer as cart} from 'customer/reducers/cart';
// import {reducer as orders} from 'customer/reducers/orders';
import {reducer as trackings} from 'customer/reducers/trackings';
import {reducer as working_order} from 'customer/reducers/working_order';
import {reducer as upcoming_orders} from 'customer/reducers/upcoming_orders';
import {reducer as past_orders} from 'customer/reducers/past_orders';

export const reducer = combineReducers({
  cart,
  // orders,
  working_order,
  upcoming_orders,
  past_orders,
  trackings
});
