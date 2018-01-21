import {request} from 'utils/network';

function saveProfile(body) {
  const url = `driver/profile/update`;
  let requestParams = {
    url,
    method: 'POST',
    body: body,
  };
  return request(requestParams);
}
function startJob(id,body) {
  const url = `driver/jobs/${id}/start`;
  let requestParams = {
    url,
    method: 'POST',
    body: body,
  };
  return request(requestParams);
}

function finishJob(id,body) {
  const url = `driver/jobs/${id}/finish`;
  let requestParams = {
    url,
    method: 'POST',
    body: body,
  };
  return request(requestParams);
}

function fetchProfile() {
  const url = `driver/profile`;
  return request({url});
}

function fetchUpcomingOrders() {
  const url = `driver/orders/upcoming`;
  return request({url});
}

function fetchWorkingOrder() {
  const url = `driver/orders/working`;
  return request({url});
}

export const API = {
  saveProfile,
  fetchProfile,
  fetchUpcomingOrders,
  fetchWorkingOrder,
  startJob,
  finishJob
};
