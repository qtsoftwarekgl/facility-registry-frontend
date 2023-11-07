import _ from 'lodash';
import {
  FETCH_PACKAGE,
  FETCH_PACKAGE_REQUEST,
  FETCH_PACKAGE_SUCCESS,
  FETCH_PACKAGE_ERROR,
  CREATE_PACKAGE,
  CREATE_PACKAGE_REQUEST,
  CREATE_PACKAGE_SUCCESS,
  CREATE_PACKAGE_ERROR,
  PACKAGE_DELETE,
  PACKAGE_DELETE_REQUEST,
  PACKAGE_DELETE_SUCCESS,
  PACKAGE_DELETE_ERROR,
  PACKAGE_UPDATE,
  PACKAGE_UPDATE_REQUEST,
  PACKAGE_UPDATE_SUCCESS,
  PACKAGE_UPDATE_ERROR,
  STATUS_UPDATE_PACKAGE,
  STATUS_UPDATE_PACKAGE_REQUEST,
  STATUS_UPDATE_PACKAGE_SUCCESS,
  STATUS_UPDATE_PACKAGE_ERROR,
  PACKAGE_CLEAR_STORE,
} from './constants';

export function fetchPackage(params) {
  const payload = {
    page: 1,
    limit: 20
  };
  if (!_.isEmpty(params)) {
    Object.keys(params).forEach(key => {
      payload[key] = params[key];
    });
  }
  return {
    type: FETCH_PACKAGE,
    payload
  };
}

export function fetchPackageRequest() {
  return {
    type: FETCH_PACKAGE_REQUEST
  };
}

export function fetchPackageSuccess(response) {
  return {
    type: FETCH_PACKAGE_SUCCESS,
    packageData: response.status === 'ok' ? response.data : [],
    count: response.status === 'ok' ? response.count : 0,
  }
}

export function fetchPackageError(error) {
  return {
    type: FETCH_PACKAGE_ERROR
  };
}

export function createPackage(packageData) {
  return {
    type: CREATE_PACKAGE,
    payload: packageData
  };
}

export function createPackageRequest() {
  return {
    type: CREATE_PACKAGE_REQUEST
  };
}

export function createPackageSuccess(response) {
  let errorMessage = '';
  if (response.status === 'error') {
    errorMessage = response.message;
  }
  return {
    type: CREATE_PACKAGE_SUCCESS,
    packageCreatedStatus: response.status,
    errorMessage
  };
}

export function createPackageError(response) {
  let errorMessage = '';
  if (response.status === 'error') {
    errorMessage = response.message;
  }
  return {
    type: CREATE_PACKAGE_ERROR,
    packageCreatedStatus: response.status,
    errorMessage
  };
}

export function updatePackage(id, packageData) {
  const packages = packageData;
  packages._id = id;
  return {
    type: PACKAGE_UPDATE,
    payload: packages,
  };
}

export function updatePackageRequest() {
  return {
    type: PACKAGE_UPDATE_REQUEST
  };
}

export function updatePackageSuccess(response) {
  let errorMessage = '';
  if (response.status === 'error') {
    errorMessage = response.message;
  }
  return {
    type: PACKAGE_UPDATE_SUCCESS,
    packageUpdateStatus: response.status,
    errorMessage
  };
}

export function updatePackageError(response) {
  let errorMessage = '';
  if (response.status === 'error') {
    errorMessage = response.message;
  }
  return {
    type: PACKAGE_UPDATE_ERROR,
    packageUpdateStatus: 'error',
    errorMessage
  };
}

export function deletePackage(id) {
  return {
    type: PACKAGE_DELETE,
    payload: id
  };
}

export function packageDeleteRequest() {
  return {
    type: PACKAGE_DELETE_REQUEST
  };
}

export function packageDeleteSuccess(response) {
  return {
    type: PACKAGE_DELETE_SUCCESS,
    packageDeleteStatus: response.status
  };
}

export function packageDeleteError() {
  return {
    type: PACKAGE_DELETE_ERROR
  };
}

export function clearStore() {
  return {
    type: PACKAGE_CLEAR_STORE
  };
}

export function packageUpdateStatus(id, statusUpdateData) {
  const statusData = statusUpdateData;
  return {
    type: STATUS_UPDATE_PACKAGE,
    status: statusData.status,
    id: id
  };
}

export function packageUpdateStatusRequest() {
  return {
    type: STATUS_UPDATE_PACKAGE_REQUEST
  };
}

export function packageUpdateStatusSuccess(response) {
  let errorMessage = '';
  if (response.status === 'error') {
    errorMessage = response.message;
  }
  return {
    type: STATUS_UPDATE_PACKAGE_SUCCESS,
    statusUpdateStatus: response.status,
    errorMessage
  };
}

export function packageUpdateStatusError(response) {
  let errorMessage = '';
  if (response.status === 'error') {
    errorMessage = response.message;
  }
  return {
    type: STATUS_UPDATE_PACKAGE_ERROR,
    statusUpdateStatus: 'error',
    errorMessage
  };
}
