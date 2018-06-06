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

function startWorking(id) {
  const path = `driver/jobs/${id}/start/work`;
  let requestParams = {
    path,
    method: 'POST',
  };
  return request(requestParams);
}

function stopWorking(id) {
  const path = `driver/jobs/${id}/stop/work`;
  let requestParams = {
    path,
    method: 'POST',
  };
  return request(requestParams);
}
function startDriving(id) {
  const path = `driver/jobs/${id}/start/drive`;
  let requestParams = {
    path,
    method: 'POST',
  };
  return request(requestParams);
}

function stopDriving(id) {
  const path = `driver/jobs/${id}/stop/drive`;
  let requestParams = {
    path,
    method: 'POST',
  };
  return request(requestParams);
}

function uploadPhotos(id, params) {
  const path = `driver/jobs/${id}/photos`;
  let requestParams = {
    path,
    params,
    method: 'POST',
  };
  return request(requestParams);
}

function approvePhotos(id,params) {
  const path = `driver/jobs/${id}/photos/approve`;
  let requestParams = {
    path,
    params,
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

function fetchJobPhotos(id) {
  const path = `driver/jobs/${id}/photos`;
  return request({path, requiresAuthentication: true});
}

export const API = {
  saveProfile,
  fetchProfile,
  fetchUpcomingOrders,
  fetchWorkingOrder,
  fetchOrderDetails,
  fetchPastOrders,
  startWorking,
  stopWorking,
  startDriving,
  stopDriving,
  fetchJobPhotos,
  uploadPhotos,
  approvePhotos,
};
