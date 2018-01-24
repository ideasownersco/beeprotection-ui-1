import {request} from 'utils/network';

function fetchUpcomingOrders(params = {}) {
  const path = `company/orders/upcoming`;
  return request({path, requiresAuthentication: true, params});
}

function fetchPastOrders(params = {}) {
  const path = `company/orders/past`;
  return request({path, requiresAuthentication: true, params});
}

function fetchWorkingOrders(params = {}) {
  const path = `company/orders/working`;
  return request({path, requiresAuthentication: true, params});
}

function fetchDrivers() {
  const path = `company/drivers`;
  return request({path, requiresAuthentication: true});
}

function fetchOrderDetails(id, params = {}) {
  const path = `company/orders/${id}/details`;
  return request({path, requiresAuthentication: true});
}

function assignDriver(params = {}) {
  const path = `company/orders/${params.id}/drivers/assign`;
  let requestParams = {
    path,
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
