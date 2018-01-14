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

function fetchProfile() {
  const url = `driver/profile`;
  return request({url});
}

function fetchUpcomingOrders() {
  const url = `driver/orders`;
  return request({url});
}

export const API = {
  saveProfile,
  fetchProfile,
  fetchUpcomingOrders,
};
