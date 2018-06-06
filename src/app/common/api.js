import {request} from 'utils/network';

function storePushToken(params) {
  const path = `push_token/register`;
  return request({path, method: 'POST', params});
}
function storeDeviceID(params) {
  const path = `device/uuid/register`;
  return request({path, method: 'POST', params});
}

export const API = {
  storePushToken,
  storeDeviceID,
};
