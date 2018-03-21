import {API_URL, AUTH_KEY} from 'utils/env';
import I18n from 'utils/locale';
import {getStorageItem} from 'utils/functions';
import NavigatorService from 'components/NavigatorService';

export async function request({
  path,
  protocol = 'http://',
  domain = null, //http://wwww.waa.com
  method = 'GET',
  params = {
    body: null, // for POST
    query: '', // in path abc=1 // must be QS.stringified
    isBlob: false,
    paginated: false,
    paginatedUrl: '',
  },
  requiresAuthentication = false,
  forceAuthentication = false,
}) {
  let {paginated, paginatedUrl, body, isBlob, query} = params;

  let fullUrl;

  if (paginated) {
    fullUrl = paginatedUrl;
  } else {
    let localeAwareUrl = domain
      ? domain
      : `${protocol + API_URL}/${path}?lang=${I18n.locale}&`;
    fullUrl = localeAwareUrl + query;
  }

  const apiToken = await getStorageItem(AUTH_KEY);

  if (__DEV__) {
    if (console.group) {
      console.groupCollapsed('action', 'NETWORK_REQUEST');
      console.log({
        path: fullUrl,
        method: method,
        params: params,
        api_token: apiToken,
      });
      console.groupEnd();
    }
  }

  if (requiresAuthentication && !apiToken) {
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

  const request = fetch(fullUrl, {
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
      console.log('fetch error', e);
      return Promise.reject(`${e}`);
    });
}
