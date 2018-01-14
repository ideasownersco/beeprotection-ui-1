import {request} from 'utils/network';

function fetchCartItems(params = '') {
  const url = `cart/make${params}`;
  return request({url});
}

function fetchCategories(params = '') {
  const url = `categories${params}`;
  return request({url});
}

function fetchTimings(params = '') {
  const url = `timings${params}`;
  return request({url});
}

function fetchAddresses(params = '') {
  const url = `customer/addresses${params}`;
  return request({url});
}

function fetchStandingOrders(params = '') {
  const url = `customer/orders${params}`;
  return request({url});
}

function saveAddress(params) {
  const url = `customer/addresses`;
  let requestParams = {
    url,
    body: params,
    method: 'POST',
    // requiresAuthentication: true,
    // forceAuthentication: true,
  };
  return request(requestParams);
}

function saveOrder(params) {
  const url = `customer/orders`;
  let requestParams = {
    url,
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
  fetchStandingOrders,
};
