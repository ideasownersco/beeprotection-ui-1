import map from 'lodash/map';
import {createSelector} from 'reselect';
import {denormalize} from 'normalizr';
import {Schema} from 'utils/schema';

const getCart = state => state.customer.cart;
const cartItems = state => state.customer.cart.items;
const categoriesEntity = state => state.entities.categories;
const packagesEntity = state => state.entities.packages;
const servicesEntity = state => state.entities.services;
const schemas = state => state.entities;
const timingsEntity = state => state.entities.timings;
const areasEntity = state => state.entities.areas;
const upcomingOrders = state => state.customer.upcoming_orders.ids;
const workingOrder = state => state.customer.working_order.ids;
const pastOrders = state => state.customer.past_orders.ids;
const getItemIdProp = (state, itemID) => itemID;
const getTrackings = state => state.customer.trackings;

const getCategories = createSelector(
  [schemas, categoriesEntity],
  (entities, categories) => {
    return map(categories, category =>
      denormalize(category.id, Schema.categories, entities),
    );
  },
);

const getParentCategories = createSelector([getCategories], categories => {
  return categories.filter(category => category.parent_id === null);
});

const getTimings = createSelector([timingsEntity], timings => {
  return Object.keys(timings).map(timing => timings[timing]);
});

const getAreas = createSelector([areasEntity], timings => {
  return Object.keys(timings).map(timing => timings[timing]);
});

const getOrderByID = () => {
  return createSelector([schemas, getItemIdProp], (entities, itemID) =>
    denormalize(itemID, Schema.orders, entities),
  );
};

const getCartItems = createSelector(
  [cartItems, categoriesEntity, packagesEntity, servicesEntity],
  (items, categories, packages, services) => {
    return Object.keys(items)
      .map(id => items[id])
      .map(item => {
        return {
          ...item,
          category: categories[item.category],
          package: packages[item.package],
          services:
            (item.services &&
              item.services.map(service => services[service])) ||
            [],
        };
      });
  },
);

const getCartTotal = createSelector([cartItems], items => {
  return Object.keys(items)
    .map(item => items[item].total)
    .reduce((total, amount) => total + amount, 0);
});

const getLocationUpdatesForJob = () => {
  return createSelector(
    [getTrackings, getItemIdProp],
    (tracking, jobID) => tracking[jobID] || {},
  );
};

const getUpcomingOrders = createSelector(
  [schemas, upcomingOrders, workingOrder],
  (entities, orders, workingOrderID) => {
    let orderSet =
      (orders &&
        orders
          .map(orderId => denormalize(orderId, Schema.orders, entities))
          .filter(order => order.id !== workingOrderID)) ||
      [];

    return [...new Set(orderSet)];
  },
);

const getWorkingOrder = createSelector(
  [schemas, workingOrder],
  // (entities, orderID) => denormalize(orderID, Schema.orders, entities),
  (entities, orders) => {
    return (
      (orders &&
        orders.map(orderId => denormalize(orderId, Schema.orders, entities))) ||
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
  getCart,
  getCartItems,
  getCartTotal,
  getCategories,
  getParentCategories,
  getTimings,
  getOrderByID,
  getLocationUpdatesForJob,
  getUpcomingOrders,
  getWorkingOrder,
  getPastOrders,
  getAreas,
};
