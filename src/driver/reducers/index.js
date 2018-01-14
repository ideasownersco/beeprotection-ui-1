import {combineReducers} from 'redux';
import {reducer as profile} from 'driver/reducers/profile';
import {reducer as orders} from 'driver/reducers/orders';

export const reducer = combineReducers({profile, orders});
