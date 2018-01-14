import {combineReducers} from 'redux';
import {reducer as cart} from 'customer/reducers/cart';
import {reducer as orders} from 'customer/reducers/orders';

export const reducer = combineReducers({cart, orders});
