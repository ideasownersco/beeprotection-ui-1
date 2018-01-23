import {request} from 'utils/network';

function fetchUpcomingOrders(params = {}) {
  const url = `company/orders/upcoming`;
  return request({url, params, requiresAuthentication: true});
}

function fetchPastOrders(params = '') {
  const url = `company/orders/past${params}`;
  return request({url, requiresAuthentication: true});
}

function fetchWorkingOrders(params = '') {
  const url = `company/orders/working/${params}`;
  return request({url, requiresAuthentication: true});
}

function fetchDrivers() {
  const url = `company/drivers`;
  return request({url, requiresAuthentication: true});
}

function fetchOrderDetails(params = '') {
  const url = `company/orders/${params.order_id}/details`;
  return request({url, requiresAuthentication: true});
}

function assignDriver(params) {
  const url = `company/orders/${params.order_id}/drivers/assign`;
  let requestParams = {
    url,
    method: 'POST',
    body: params,
  };
  return request(requestParams);
}

export const API = {
  fetchUpcomingOrders,
  fetchWorkingOrders,
  fetchPastOrders,
  fetchOrderDetails,
  fetchDrivers,
  assignDriver,
};
