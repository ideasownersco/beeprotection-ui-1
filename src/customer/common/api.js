import {request} from 'utils/network';

function fetchCartItems(params = {}) {
  const path = `cart/make${params}`;
  return request({path});
}

function fetchCategories(params = {}) {
  const path = `categories${params}`;
  return request({path});
}

function fetchTimings(params = {}) {
  const path = `timings${params}`;
  return request({path});
}

function fetchAddresses(params = {}) {
  const path = `customer/addresses${params}`;
  return request({path});
}

function fetchUpcomingOrders(params = {}) {
  const path = `customer/orders/upcoming${params}`;
  return request({path});
}

function saveAddress(params) {
  const path = `customer/addresses`;
  let requestParams = {
    path,
    body: params,
    method: 'POST',
    // requiresAuthentication: true,
    // forceAuthentication: true,
  };
  return request(requestParams);
}

function saveOrder(params) {
  const path = `customer/orders`;
  let requestParams = {
    path,
    body: params,
    method: 'POST',
  };
  return request(requestParams);
}

export const API = {
  fetchCartItems,
  fetchCategories,
  fetchTimings,
  fetchAddresses,
  saveAddress,
  saveOrder,
  fetchUpcomingOrders,
};
