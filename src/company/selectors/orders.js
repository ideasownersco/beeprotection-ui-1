import {createSelector} from 'reselect';
import {denormalize} from 'normalizr';
import {Schema} from 'utils/schema';

const schemas = state => state.entities;
const getStandingOrderIds = state => state.company.orders.standingOrderIds;

const getItemIdProp = ({}, itemID) => itemID;

const denormalizeOrder = (orderId, entities) =>
  denormalize(orderId, Schema.orders, entities);

const getOrders = createSelector(
  [schemas, getStandingOrderIds],
  (entities, orders) => {
    return (
      (orders && orders.map(orderId => denormalizeOrder(orderId, entities))) ||
      []
    );
  },
);

const getOrderByID = () => {
  return createSelector([schemas, getItemIdProp], (entities, itemID) =>
    denormalizeOrder(itemID, entities),
  );
};

export const SELECTORS = {
  getOrders,
  getOrderByID,
};
