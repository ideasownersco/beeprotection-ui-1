import {createSelector} from 'reselect';
import {denormalize} from 'normalizr';
import {Schema} from 'utils/schema';

const schemas = state => state.entities;
const upcomingOrders = state => state.driver.upcoming_orders.ids;
const workingOrder = state => state.driver.working_order.id;
const pastOrders = state => state.driver.past_orders.ids;
const getItemIdProp = (state, itemID) => itemID;

const getOrderByID = () => {
  return createSelector([schemas, getItemIdProp], (entities, itemID) =>
    denormalize(itemID, Schema.orders, entities),
  );
};

const getUpcomingOrders = createSelector(
  [schemas, upcomingOrders, workingOrder],
  (entities, orders, workingOrderID) => {
    return (
      (orders &&
        orders
          .map(orderId => denormalize(orderId, Schema.orders, entities))
          .filter(
            order => order.id !== workingOrderID && order.is_completed !== true,
          )) ||
      []
    );
  },
);

const getWorkingOrder = createSelector(
  [schemas, workingOrder],
  (entities, orderID) => denormalize(orderID, Schema.orders, entities),
);

const getPastOrders = createSelector(
  [schemas, pastOrders],
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
  getWorkingOrder,
  getPastOrders,
  getOrderByID,
};
