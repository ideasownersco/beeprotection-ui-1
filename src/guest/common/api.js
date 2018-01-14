import isNull from 'lodash/isNull';
import {request} from 'utils/network';

function login(params, token) {
  if (isNull(token) && isNull(params)) return;
  const url = `auth/login`;

  let requestParams = {
    url,
    body: params,
    method: 'POST',
  };
  return request(requestParams);
}

function register(params) {
  const url = `auth/register`;
  let requestParams = {
    url,
    body: params,
    method: 'POST',
  };
  return request(requestParams);
}

function forgotPassword(params) {
  const url = `auth/password/forgot`;
  let requestParams = {
    url,
    body: params,
    method: 'POST',
  };
  return request(requestParams);
}

function recoverPassword(params) {
  const url = `auth/password/recover`;
  let requestParams = {
    url,
    body: params,
    method: 'POST',
  };
  return request(requestParams);
}

function updatePassword(params) {
  const url = `auth/password/update`;
  let requestParams = {
    url,
    body: params,
    method: 'POST',
  };
  return request(requestParams);
}

export const API = {
  login,
  register,
  recoverPassword,
  forgotPassword,
  updatePassword,
};
