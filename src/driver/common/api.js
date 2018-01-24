import {request} from 'utils/network';

function saveProfile(body) {
  const path = `driver/profile/update`;
  let requestParams = {
    path,
    method: 'POST',
    body: body,
  };
  return request(requestParams);
}
function startJob(id, body) {
  const path = `driver/jobs/${id}/start`;
  let requestParams = {
    path,
    method: 'POST',
    body: body,
  };
  return request(requestParams);
}

function finishJob(id, body) {
  const path = `driver/jobs/${id}/finish`;
  let requestParams = {
    path,
    method: 'POST',
    body: body,
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

export const API = {
  saveProfile,
  fetchProfile,
  fetchUpcomingOrders,
  fetchWorkingOrder,
  startJob,
  finishJob,
};
