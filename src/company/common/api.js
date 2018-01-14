import {request} from 'utils/network';

function fetchStandingOrders(params = '') {
  const url = `company/orders${params}`;
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
  fetchStandingOrders,
  fetchOrderDetails,
  fetchDrivers,
  assignDriver,
};
