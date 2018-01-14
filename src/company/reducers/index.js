import {combineReducers} from 'redux';
import {reducer as orders} from 'company/reducers/orders';

export const reducer = combineReducers({orders});
