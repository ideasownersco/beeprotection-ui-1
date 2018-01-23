import {API_URL, AUTH_KEY} from 'utils/env';
import I18n from 'utils/locale';
import {getStorageItem} from 'utils/functions';
import NavigatorService from 'components/NavigatorService';

export async function request({
  url,
  paginated = false,
  protocol = 'http://',
  domain = null,
  method = 'GET',
  params = {
    body : null, // for POST
    urlParams: null, // in url abc=1 // must be QS.stringified
    isBlob : false,
  },
  // body = null,
  // isBlob = false,
  requiresAuthentication = false,
  forceAuthentication = false,
}) {
  // const delimiter = url.indexOf('?') === -1 ? '?' : '&';

  // const localeAwareUrl = `${API_URL}/${url + delimiter}lang=${I18n.locale}`;


  const urlParams = params.urlParams ? `&${params.urlParams}` : '';

  const localeAwareUrl = `${API_URL}/${url}?lang=${I18n.locale}${urlParams}`;

  let domainName = domain ? domain : paginated ? url : localeAwareUrl; // abc.com //http://abc.com/?page=1&lang=2

  let fullURL =  `${protocol}${domainName}`; // http://abc.com/?page=1&lang=2

  const apiToken = await getStorageItem(AUTH_KEY);

  if (__DEV__) {
    if (console.group) {
      console.groupCollapsed('action', 'NETWORK_REQUEST');
      console.log({
        url: fullURL,
        method: method,
        body: params.body,
        api_token:apiToken
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
    params.isBlob ? 'multipart/form-data' : 'application/json',
  );

  const request = fetch(fullURL, {
    method,
    body: params.isBlob ? params.body : JSON.stringify(params.body),
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
