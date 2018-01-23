import {combineReducers} from 'redux';
import {reducer as working_orders} from 'company/reducers/working_orders';
import {reducer as upcoming_orders} from 'company/reducers/upcoming_orders';
import {reducer as past_orders} from 'company/reducers/past_orders';

export const reducer = combineReducers({working_orders,upcoming_orders,past_orders});
