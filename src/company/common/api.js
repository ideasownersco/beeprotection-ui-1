import {request} from 'utils/network';

function fetchUpcomingOrders(params = {}) {
  const url = `company/orders/upcoming`;
  return request({url, requiresAuthentication: true, params});
}

function fetchPastOrders(params = '') {
  const url = `company/orders/past`;
  return request({url, requiresAuthentication: true});
}

function fetchWorkingOrders(params = {}) {
  const url = `company/orders/working`;
  return request({url, requiresAuthentication: true, params});
}

function fetchDrivers() {
  const url = `company/drivers`;
  return request({url, requiresAuthentication: true});
}

function fetchOrderDetails(params = {}) {
  const url = `company/orders/${params.id}/details`;
  return request({url, requiresAuthentication: true});
}

function assignDriver(params = {}) {
  const url = `company/orders/${params.id}/drivers/assign`;
  let requestParams = {
    url,
    method: 'POST',
    params,
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
