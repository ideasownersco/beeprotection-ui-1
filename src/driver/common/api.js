import {request} from 'utils/network';

function saveProfile(params) {
  const path = `driver/profile/update`;
  let requestParams = {
    path,
    method: 'POST',
    params,
  };
  return request(requestParams);
}
function startJob(id) {
  const path = `driver/jobs/${id}/start`;
  let requestParams = {
    path,
    method: 'POST',
  };
  return request(requestParams);
}

function finishJob(id) {
  const path = `driver/orders/${id}/job/finish`;
  let requestParams = {
    path,
    method: 'POST',
  };
  return request(requestParams);
}

function fetchProfile() {
  const path = `driver/profile`;
  return request({path});
}

function fetchUpcomingOrders() {
  const path = `driver/orders/upcoming`;
  return request({path});
}

function fetchWorkingOrder() {
  const path = `driver/orders/working`;
  return request({path});
}

function fetchPastOrders() {
  const path = `driver/orders/past`;
  return request({path});
}

function fetchOrderDetails(id) {
  const path = `driver/orders/${id}/details`;
  return request({path, requiresAuthentication: true});
}

export const API = {
  saveProfile,
  fetchProfile,
  fetchUpcomingOrders,
  fetchWorkingOrder,
  fetchOrderDetails,
  fetchPastOrders,
  startJob,
  finishJob,
};
