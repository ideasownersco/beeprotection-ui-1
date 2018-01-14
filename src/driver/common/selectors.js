import {createSelector} from 'reselect';
import {SELECTORS as USER_SELECTORS} from 'guest/common/selectors';
import flatten from 'lodash/flatten';
import {denormalize} from 'normalizr';
import {Schema} from 'utils/schema';

const ordersSchema = state => state.entities.orders;
const upcomingOrders = state => state.driver.orders.upcomingOrderIDs;
const schemas = state => state.entities;

const getUpcomingOrders = createSelector(
  [schemas, upcomingOrders],
  (entities, orders) => {
    return (
      (orders &&
        orders.map(orderId => denormalize(orderId, Schema.orders, entities))) ||
      []
    );
  },
);
export const SELECTORS = {
  getUpcomingOrders,
};
