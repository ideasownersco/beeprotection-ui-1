import {API_URL, AUTH_KEY, NETWORK_PROTOCOL} from 'utils/env';
import {isRTL} from 'utils/locale';
import {getStorageItem} from 'utils/functions';
import NavigatorService from 'components/NavigatorService';

export async function request({
  path,
  protocol = NETWORK_PROTOCOL,
  domain = null,
  method = 'GET',
  params = {
    body: null, // for POST
    query: '', // in path abc=1 // must be QS.stringified
    isBlob: false,
    paginated: false,
    paginatedUrl: '',
    web: false,
  },
  requiresAuthentication = false,
  forceAuthentication = false,
}) {

  const apiToken = await getStorageItem(AUTH_KEY);

  let {paginated, paginatedUrl, body, isBlob, query} = params;

  let fullUrl;
  if (paginated) {
    fullUrl = paginatedUrl;
  } else {
    let localeAwareUrl = domain
      ? domain
      : `${protocol + API_URL}/${path}?lang=${isRTL ? 'ar' : 'en'}&`;
    fullUrl = localeAwareUrl + query;
  }


  if (__DEV__) {
    if (console.group) {
      console.log('NETWORK_REQUEST',{
        path: fullUrl,
        method: method,
        params: params,
        api_token: apiToken,
      });
    }
  }

  if (requiresAuthentication && !apiToken) {
    if (forceAuthentication) {
      NavigatorService.navigate('Login');
    }
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
    // .then(res => res.text())          // convert to plain text
    // .then(text => console.log(text))  // then log it out
    .then(response =>
      response.json()
        .then(json => {
        return ({
          status: response.status,
          statusType: response.statusType,
          json,
        })
      }),
    )
    .then(({status, statusType, json}) => {
      if (__DEV__) {
        if (console.group) {
          console.log('NETWORK_RESPONSE', json);
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
      console.log('NETWORK_REQUEST_ERROR', e);
      return Promise.reject(`${e}`);
    });
}
