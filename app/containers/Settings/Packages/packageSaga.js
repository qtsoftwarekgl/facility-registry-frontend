import {
    all, call, put, takeEvery, fork
  } from 'redux-saga/effects';
  import {
    FETCH_PACKAGE,
    CREATE_PACKAGE,
    PACKAGE_DELETE,
    PACKAGE_UPDATE,
    STATUS_UPDATE_PACKAGE
  } from './constants';
  import {
    fetchPackageRequest,
    fetchPackageSuccess,
    fetchPackageError,
    createPackageRequest,
    createPackageSuccess,
    createPackageError,
    packageDeleteRequest,
    packageDeleteSuccess,
    packageDeleteError,
    updatePackageRequest,
    updatePackageSuccess,
    updatePackageError,
    packageUpdateStatusRequest,
    packageUpdateStatusSuccess,
    packageUpdateStatusError
  } from './packageAction';
  import API from '../../../config/axiosConfig';
  import * as URL from '../../../lib/apiUrls';
  
  
  export function* fetchPackageAsync(action) {
    const params = action.payload;
    try {
      yield put(fetchPackageRequest());
      const data = yield call(() => API.get(URL.PACKAGE, { params }));
      yield put(fetchPackageSuccess(data));
    } catch (error) {
      yield put(fetchPackageError(error));
    }
  }
  
  export function* createPackage(action) {
    try {
      yield put(createPackageRequest());
      const data = yield call(() => API.post(URL.PACKAGE, action.payload));
      yield put(createPackageSuccess(data));
    } catch (error) {
      yield put(createPackageError(error));
    }
  }
  
  export function* updatePackage(action) {
    try {
      yield put(updatePackageRequest());
      const data = yield call(() => API.put(URL.PACKAGE, action.payload));
      yield put(updatePackageSuccess(data));
    } catch (error) {
      yield put(updatePackageError(error));
    }
  }

  export function* packageUpdateStatus(action) {
    try {
      yield put(packageUpdateStatusRequest());
      const data = yield call(() => API.get(`${URL.PACKAGE}/activate/${action.id}/${action.status}`));
      yield put(packageUpdateStatusSuccess(data));
    } catch (error) {
      yield put(packageUpdateStatusError(error));
    }
  }
  
  export function* deletePackage(action) {
    try {
      yield put(packageDeleteRequest());
      const data = yield call(() => API.get(`${URL.PACKAGE}/delete/${action.payload}`));
      yield put(packageDeleteSuccess(data));
    } catch (error) {
      yield put(packageDeleteError());
    }
  }
   
  function* PackageRootSaga() {
    yield all([
      yield takeEvery(FETCH_PACKAGE, fetchPackageAsync),
      yield takeEvery(CREATE_PACKAGE, createPackage),
      yield takeEvery(PACKAGE_DELETE, deletePackage),
      yield takeEvery(PACKAGE_UPDATE, updatePackage),
      yield takeEvery(STATUS_UPDATE_PACKAGE, packageUpdateStatus)
    ]);
  }
  
  const PackageSagas = [
    fork(PackageRootSaga),
  ];
  
  export default PackageSagas;
  