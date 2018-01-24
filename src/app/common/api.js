import {API_URL} from 'utils/env';
import {request} from 'utils/network';

function storePushToken(params) {
  const path = `push_token/register`;
  return request({path, method: 'POST', params});
}

export const API = {
  storePushToken,
};
