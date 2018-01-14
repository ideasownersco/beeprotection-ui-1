import {API_URL, AUTH_KEY} from 'utils/env';
import I18n from 'utils/locale';
import {getStorageItem} from 'utils/functions';
import NavigatorService from 'components/NavigatorService';

export async function request({
  url,
  method = 'GET',
  body = null,
  isBlob = false,
  requiresAuthentication = false,
  forceAuthentication = false,
}) {
  const delimiter = url.indexOf('?') === -1 ? '?' : '&';
  const localeAwareUrl = `${API_URL}/${url + delimiter}lang=${I18n.locale}`;
  const apiToken = await getStorageItem(AUTH_KEY);

  if (__DEV__) {
    if (console.group) {
      console.groupCollapsed('action', 'NETWORK_REQUEST');
      console.log({
        method: method,
        body: body,
        url: localeAwareUrl,
      });
      console.groupEnd();
    }
  }

  if (requiresAuthentication && !apiToken) {
    // if (__DEV__) {
    //   if (console.group) {
    //     console.groupCollapsed('action', 'NETWORK_REQUEST_FAILED');
    //     console.log('NOT_AUTHENTICATED');
    //     console.groupEnd();
    //   }
    // }
    if (forceAuthentication) {
      NavigatorService.navigate('Login');
    }
    throw 'CLIENT_NOT_AUTHENTICATED';
  }

  let headers = new Headers();
  headers.append('Accept', 'application/json');
  headers.append('Authorization', 'Bearer ' + apiToken);
  headers.append(
    'Content-Type',
    isBlob ? 'multipart/form-data' : 'application/json',
  );

  const request = fetch(localeAwareUrl, {
    method,
    body: method === 'GET' ? null : isBlob ? body : JSON.stringify(body),
    headers,
  });

  return request
    .then(response =>
      response.json().then(json => ({
        status: response.status,
        statusType: response.statusType,
        json,
      })),
    )
    .then(({status, statusType, json}) => {
      // .then(({json}) => {
      if (__DEV__) {
        if (console.group) {
          console.groupCollapsed('action', 'NETWORK_RESPONSE');
          console.log('payload', json);
          console.groupEnd();
        }
      }

      if (!json.success) {
        const errorMsg = json.message
          ? json.message
          : `Unknown error occurred. STATUS : ${status}, STATUS TYPE : ${statusType}`;
        return Promise.reject(errorMsg);
      }

      return json;
    })
    .catch(e => {
      return Promise.reject(`${e}`);
    });
}
