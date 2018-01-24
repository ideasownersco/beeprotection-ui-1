import {createSelector} from 'reselect';
import {denormalize} from 'normalizr';
import {Schema} from 'utils/schema';

const schemas = state => state.entities;
const upcomingOrders = state => state.company.upcoming_orders.ids;
const workingOrders = state => state.company.working_orders.ids;
const pastOrders = state => state.company.past_orders.ids;
const getItemIdProp = ({}, itemID) => itemID;

const getOrderByID = () => {
  return createSelector([schemas, getItemIdProp], (entities, itemID) =>
    denormalize(itemID, Schema.orders, entities),
  );
};

const getUpcomingOrders = createSelector(
  [schemas, upcomingOrders],
  (entities, orders) => {
    return (
      (orders &&
        orders
          .map(orderId => denormalize(orderId, Schema.orders, entities))
          .filter(order => !order.is_working)) ||
      []
    );
  },
);

const getWorkingOrders = createSelector(
  [schemas, workingOrders],
  (entities, orders) => {
    return (
      (orders &&
        orders
          .map(orderId => denormalize(orderId, Schema.orders, entities))
          .filter(order => order.is_working)) ||
      []
    );
  },
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
  getWorkingOrders,
  getPastOrders,
  getOrderByID,
};
