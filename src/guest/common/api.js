import isNull from 'lodash/isNull';
import {request} from 'utils/network';

function login(params, token) {
  if (isNull(token) && isNull(params)) return;
  const path = `auth/login`;

  let requestParams = {
    path,
    params,
    method: 'POST',
  };
  return request(requestParams);
}

function register(params) {
  const path = `auth/register`;
  let requestParams = {
    path,
    params,
    method: 'POST',
  };
  return request(requestParams);
}

function forgotPassword(params) {
  const path = `auth/password/forgot`;
  let requestParams = {
    path,
    params,
    method: 'POST',
  };
  return request(requestParams);
}

function recoverPassword(params) {
  const path = `auth/password/recover`;
  let requestParams = {
    path,
    params,
    method: 'POST',
  };
  return request(requestParams);
}

function updatePassword(params) {
  const path = `auth/password/update`;
  let requestParams = {
    path,
    params,
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
