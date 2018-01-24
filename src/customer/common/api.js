import {request} from 'utils/network';

function fetchCartItems(params = {}) {
  const path = `cart/make`;
  return request({path,params});
}

function fetchCategories(params = {}) {
  const path = `categories`;
  return request({path,params});
}

function fetchTimings(params = {}) {
  const path = `timings`;
  return request({path,params});
}

function fetchAddresses(params = {}) {
  const path = `customer/addresses`;
  return request({path,params});
}

function fetchUpcomingOrders(params = {}) {
  const path = `customer/orders/upcoming`;
  return request({path,params});
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
    // requiresAuthentication: true,
    // forceAuthentication: true,
  };
  return request(requestParams);
}

function saveOrder(params) {
  const path = `customer/orders`;
  let requestParams = {
    path,
    params,
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
  fetchWorkingOrder,
};
