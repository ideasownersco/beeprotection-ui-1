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
const getStandingOrderIds = state => state.customer.orders.standingOrderIds;
const getItemIdProp = ({}, itemID) => itemID;

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

const getOrders = createSelector(
  [schemas, getStandingOrderIds],
  (entities, orders) => {
    let orderSet =
      (orders &&
        orders.map(orderId => denormalize(orderId, Schema.orders, entities))) ||
      [];

    return [...new Set(orderSet)];
  },
);

const getOrderByID = () => {
  return createSelector([schemas, getItemIdProp], (entities, itemID) =>
    denormalize(itemID, Schema.orders, entities),
  );
};

const getCartItems = createSelector(
  [cartItems, categoriesEntity, packagesEntity, servicesEntity],
  (items, categories, packages, services) => {
    return Object.keys(items)
      .map(item => items[item])
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
    // return Object.keys(items)
    // .map(item => items[item])
    // .map(item => {
    //   return {
    //     ...item,
    //     category: categories[item.category],
    //     package: packages[item.package],
    //     services: item.services && item.services.map(service => services[service]) || [],
    //   };
    // });
  },
);

export const SELECTORS = {
  getCart,
  getCartItems,
  getCategories,
  getParentCategories,
  getTimings,
  getOrders,
  getOrderByID,
};
