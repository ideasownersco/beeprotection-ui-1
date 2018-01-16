import io from 'socket.io-client';
import {all, call, cancel, fork, put, select, take} from 'redux-saga/effects';
import {SOCKET_SERVER} from 'utils/env';
import {eventChannel} from 'redux-saga';

import {
  ACTIONS as CUSTOMER_ACTIONS,
} from 'customer/common/actions';

import {ACTION_TYPES as AUTH_ACTIONS} from 'guest/common/actions';
import {SELECTORS as AUTH_SELECTORS} from 'guest/common/selectors';

function connect() {
  const socket = io(SOCKET_SERVER);
  return new Promise(resolve => {
    socket.on('connect', () => {
      resolve(socket);
    });
  });
}

function subscribe(socket) {
  return eventChannel(emit => {
    socket.on('location.updated', location => {
      emit(CUSTOMER_ACTIONS.locationReceived(location));
    });
    return () => {};
  });
}

// read from server
function* read(socket) {
  const channel = yield call(subscribe, socket);
  while (true) {
    let action = yield take(channel);
    yield put(action);
  }
}

// write to server
// function* addMessage(socket) {
//   const state = yield select();
//   const apiToken = AUTH_SELECTORS.getAuthToken(state);
//   while (true) {
//     const {params} = yield take(USER_ACTION_TYPES.SOCKET_EMIT_MESSAGE);
//     const message = {
//       api_token: apiToken,
//       ...params.message,
//     };
//     socket.emit('message.new', message);
//   }
// }

//
function* syncUserToSocket(socket) {
  const state = yield select();
  const userID = AUTH_SELECTORS.getAuthUserID(state);
  while (true) {
    yield take(AUTH_ACTIONS.SYNC_USER_TO_SOCKET);
    socket.emit('user.connected', userID);
  }
}

//
// function* subscribeUserToThread(socket) {
//   while (true) {
//     const threadParams = yield take(
//       USER_ACTION_TYPES.SUBSCRIBE_TO_THREAD_SOCKET,
//     );
//     socket.emit('thread.subscribe', threadParams.params.thread_id);
//   }
// }

function* handleIO(socket) {
  yield fork(read, socket);
  yield fork(syncUserToSocket, socket);
  // yield fork(subscribeUserToThread, socket);
  // yield fork(addMessage, socket);
  // yield put({
  //   type: USER_ACTION_TYPES.SYNC_USER_TO_SOCKET,
  // });
}

function* socketFlowMonitor() {
  while (true) {
    yield take(AUTH_ACTIONS.LOGIN_SUCCESS);

    const socket = yield call(connect);

    const task = yield fork(handleIO, socket);

    yield take(AUTH_ACTIONS.LOGOUT);
    yield cancel(task);
    socket.emit('logout');
  }
}

export const sagas = all([fork(socketFlowMonitor)]);

