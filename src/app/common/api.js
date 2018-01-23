import {API_URL} from 'utils/env';
import {request} from 'utils/network';

function storePushToken(params) {
  const url = `push_token/register`;
  return request({url, method: 'POST', params});
}

export const API = {
  storePushToken,
};
