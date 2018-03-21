import {request} from 'utils/network';

function fetchCartItems(params = {}) {
  const path = `customer/cart/make`;
  return request({path, params});
}

function fetchCategories(params = {}) {
  const path = `categories`;
  return request({path, params});
}

function fetchTimings(params = {}) {
  const path = `timings`;
  return request({path, params});
}

function fetchAddresses(params = {}) {
  const path = `customer/addresses`;
  return request({path, params});
}

function fetchUpcomingOrders(params = {}) {
  const path = `customer/orders/upcoming`;
  return request({path, params});
}

function fetchPastOrders(params = {}) {
  const path = `customer/orders/past`;
  return request({path, params});
}

function fetchWorkingOrder() {
  const path = `customer/orders/working`;
  return request({path});
}

function saveAddress(params) {
  const path = `customer/addresses`;
  let requestParams = {
    path,
    params,
    method: 'POST',
  };
  return request(requestParams);
}

function checkout(params) {
  const path = `customer/checkout`;
  let requestParams = {
    path,
    params,
    method: 'POST',
  };
  return request(requestParams);
}

function fetchOrderDetails(id) {
  const path = `customer/orders/${id}/details`;
  return request({path, requiresAuthentication: true});
}

export const API = {
  fetchCartItems,
  fetchCategories,
  fetchTimings,
  fetchAddresses,
  saveAddress,
  checkout,
  fetchUpcomingOrders,
  fetchPastOrders,
  fetchWorkingOrder,
  fetchOrderDetails,
};
