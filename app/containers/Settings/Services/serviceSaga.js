import {
    all, call, put, takeEvery, fork
  } from 'redux-saga/effects';
  import {
    FETCH_SERVICE,
    CREATE_SERVICE,
    SERVICE_DELETE,
    SERVICE_UPDATE,
    STATUS_UPDATE
  } from './constants';
  import {
    fetchServiceRequest,
    fetchServiceSuccess,
    fetchServiceError,
    createServiceRequest,
    createServiceSuccess,
    createServiceError,
    serviceDeleteRequest,
    serviceDeleteSuccess,
    serviceDeleteError,
    updateServiceRequest,
    updateServiceSuccess,
    updateServiceError,
    updateStatusRequest,
    updateStatusSuccess,
    updateStatusError
  } from './serviceActions';
  import API from '../../../config/axiosConfig';
  import * as URL from '../../../lib/apiUrls';
  
  
  export function* fetchServiceAsync(action) {
    const params = action.payload;
    try {
      yield put(fetchServiceRequest());
      const data = yield call(() => API.get(URL.SERVICE, { params }));
      yield put(fetchServiceSuccess(data));
    } catch (error) {
      yield put(fetchServiceError(error));
    }
  }
  
  export function* createService(action) {
    try {
      yield put(createServiceRequest());
      const data = yield call(() => API.post(URL.SERVICE, action.payload));
      yield put(createServiceSuccess(data));
    } catch (error) {
      yield put(createServiceError(error));
    }
  }
  
  export function* updateService(action) {
    try {
      yield put(updateServiceRequest());
      const data = yield call(() => API.put(URL.SERVICE, action.payload));
      yield put(updateServiceSuccess(data));
    } catch (error) {
      yield put(updateServiceError(error));
    }
  }

  export function* updateStatus(action) {
    try {
      yield put(updateStatusRequest());
      const data = yield call(() => API.get(`${URL.SERVICE}/activate/${action.id}/${action.status}`));
      yield put(updateStatusSuccess(data));
    } catch (error) {
      yield put(updateStatusError(error));
    }
  }
  
  export function* deleteService(action) {
    try {
      yield put(serviceDeleteRequest());
      const data = yield call(() => API.get(`${URL.SERVICE}/delete/${action.payload}`));
      yield put(serviceDeleteSuccess(data));
    } catch (error) {
      yield put(serviceDeleteError());
    }
  }
   
  function* ServiceRootSaga() {
    yield all([
      yield takeEvery(FETCH_SERVICE, fetchServiceAsync),
      yield takeEvery(CREATE_SERVICE, createService),
      yield takeEvery(SERVICE_DELETE, deleteService),
      yield takeEvery(SERVICE_UPDATE, updateService),
      yield takeEvery(STATUS_UPDATE, updateStatus)
    ]);
  }
  
  const ServiceSagas = [
    fork(ServiceRootSaga),
  ];
  
  export default ServiceSagas;
  