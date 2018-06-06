import {all, call, fork, put, takeLatest} from 'redux-saga/effects';
import {API} from 'driver/common/api';
import {ACTION_TYPES} from 'driver/common/actions';
import {Schema} from 'utils/schema';
import {normalize} from 'normalizr';
import {getFileExtension, getFileName} from 'utils/functions';

function* startWorking(action) {
  try {
    const params = {
      body: action.params,
    };

    const response = yield call(API.startWorking, action.job_id, params);

    const normalized = normalize(response.data, Schema.orders);

    yield put({
      type: ACTION_TYPES.START_WORKING_SUCCESS,
      entities: normalized.entities,
      result: normalized.result,
    });
  } catch (error) {
    yield put({type: ACTION_TYPES.START_WORKING_FAILURE, error});
  }
}

function* stopWorking(action) {
  try {
    const params = {
      body: action.params,
    };

    const response = yield call(API.stopWorking, action.job_id, params);
    const normalized = normalize(response.data, Schema.orders);

    yield put({
      type: ACTION_TYPES.STOP_WORKING_SUCCESS,
      entities: normalized.entities,
      result: normalized.result,
    });
  } catch (error) {
    yield put({type: ACTION_TYPES.STOP_WORKING_FAILURE, error});
  }
}

function* startDriving(action) {
  try {
    const params = {
      body: action.params,
    };

    const response = yield call(API.startDriving, action.job_id, params);

    const normalized = normalize(response.data, Schema.orders);

    yield put({
      type: ACTION_TYPES.START_DRIVING_SUCCESS,
      entities: normalized.entities,
      result: normalized.result,
    });
  } catch (error) {
    yield put({type: ACTION_TYPES.START_DRIVING_FAILURE, error});
  }
}

function* stopDriving(action) {
  try {
    const params = {
      body: action.params,
    };

    const response = yield call(API.stopDriving, action.job_id, params);
    const normalized = normalize(response.data, Schema.orders);

    yield put({
      type: ACTION_TYPES.STOP_DRIVING_SUCCESS,
      entities: normalized.entities,
      result: normalized.result,
    });
  } catch (error) {
    yield put({type: ACTION_TYPES.STOP_DRIVING_FAILURE, error});
  }
}

function* fetchJobPhotos(action) {
  try {
    const response = yield call(API.fetchJobPhotos, action.job_id);
    const normalizedOrders = normalize(response.data, Schema.orders);
    yield put({
      type: ACTION_TYPES.FETCH_JOB_PHOTOS_SUCCESS,
      entities: normalizedOrders.entities,
    });
  } catch (error) {
    yield put({type: ACTION_TYPES.FETCH_JOB_PHOTOS_FAILURE, error});
  }
}

function* uploadPhotos(action) {
  try {
    const formData = new FormData();

    let {images} = action.params;

    images.map(img => {
      formData.append('images[]', {
        uri: img,
        name: getFileName(img),
        type: getFileExtension(img),
      });
    });

    const params = {
      body: formData,
      isBlob: true,
    };

    const response = yield call(API.uploadPhotos, action.params.job_id, params);
    const normalized = normalize(response.data, Schema.orders);

    yield put({
      type: ACTION_TYPES.UPLOAD_PHOTOS_SUCCESS,
      entities: normalized.entities,
      result: normalized.result,
    });
  } catch (error) {
    yield put({type: ACTION_TYPES.UPLOAD_PHOTOS_FAILURE, error});
  }
}
function* approvePhotos(action) {
  try {

    const params = {
      body: action.params,
    };

    const response = yield call(API.approvePhotos, action.params.job_id, params);
    const normalized = normalize(response.data, Schema.orders);

    yield put({
      type: ACTION_TYPES.APPROVE_PHOTOS_SUCCESS,
      entities: normalized.entities,
      result: normalized.result,
    });
  } catch (error) {
    yield put({type: ACTION_TYPES.APPROVE_PHOTOS_FAILURE, error});
  }
}

function* startWorkingMonitor() {
  yield takeLatest(ACTION_TYPES.START_WORKING_REQUEST, startWorking);
}

function* stopWorkingMonitor() {
  yield takeLatest(ACTION_TYPES.STOP_WORKING_REQUEST, stopWorking);
}

function* startDrivingMonitor() {
  yield takeLatest(ACTION_TYPES.START_DRIVING_REQUEST, startDriving);
}

function* stopDrivingMonitor() {
  yield takeLatest(ACTION_TYPES.STOP_DRIVING_REQUEST, stopDriving);
}

function* fetchJobPhotosMonitor() {
  yield takeLatest(ACTION_TYPES.FETCH_JOB_PHOTOS_REQUEST, fetchJobPhotos);
}

function* uploadPhotosMonitor() {
  yield takeLatest(ACTION_TYPES.UPLOAD_PHOTOS_REQUEST, uploadPhotos);
}
function* approvePhotosMonitor() {
  yield takeLatest(ACTION_TYPES.APPROVE_PHOTOS_REQUEST, approvePhotos);
}

export const sagas = all([
  fork(startWorkingMonitor),
  fork(stopWorkingMonitor),
  fork(startDrivingMonitor),
  fork(stopDrivingMonitor),
  fork(fetchJobPhotosMonitor),
  fork(uploadPhotosMonitor),
  fork(approvePhotosMonitor),
]);
