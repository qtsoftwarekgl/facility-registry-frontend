import _ from 'lodash';
import {
  FETCH_SERVICE,
  FETCH_SERVICE_REQUEST,
  FETCH_SERVICE_SUCCESS,
  FETCH_SERVICE_ERROR,
  CREATE_SERVICE,
  CREATE_SERVICE_REQUEST,
  CREATE_SERVICE_SUCCESS,
  CREATE_SERVICE_ERROR,
  SERVICE_DELETE,
  SERVICE_DELETE_REQUEST,
  SERVICE_DELETE_SUCCESS,
  SERVICE_DELETE_ERROR,
  SERVICE_UPDATE,
  SERVICE_UPDATE_REQUEST,
  SERVICE_UPDATE_SUCCESS,
  SERVICE_UPDATE_ERROR,
  STATUS_UPDATE,
  STATUS_UPDATE_REQUEST,
  STATUS_UPDATE_SUCCESS,
  STATUS_UPDATE_ERROR,
  SERVICE_CLEAR_STORE,
} from './constants';

export function fetchService(params) {
  const payload = {
    page: params.page ? params.page : 1,
    limit: params.limit ? params.limit : 20
  };
  if (!_.isEmpty(params)) {
    Object.keys(params).forEach(key => {
      payload[key] = params[key];
    });
  }
  return {
    type: FETCH_SERVICE,
    payload
  };
}

export function fetchServiceRequest() {
  return {
    type: FETCH_SERVICE_REQUEST
  };
}

export function fetchServiceSuccess(response) {
  return {
    type: FETCH_SERVICE_SUCCESS,
    serviceData: response.status === 'ok' ? response.data : [],
    count: response.status === 'ok' ? response.count : 0,
  }
}

export function fetchServiceError(error) {
  return {
    type: FETCH_SERVICE_ERROR
  };
}

export function createService(serviceData) {
  return {
    type: CREATE_SERVICE,
    payload: serviceData
  };
}

export function createServiceRequest() {
  return {
    type: CREATE_SERVICE_REQUEST
  };
}

export function createServiceSuccess(response) {
  let errorMessage = '';
  if (response.status === 'error') {
    errorMessage = response.message;
  }
  return {
    type: CREATE_SERVICE_SUCCESS,
    serviceCreatedStatus: response.status,
    errorMessage
  };
}

export function createServiceError(response) {
  let errorMessage = '';
  if (response.status === 'error') {
    errorMessage = response.message;
  }
  return {
    type: CREATE_SERVICE_ERROR,
    serviceCreatedStatus: response.status,
    errorMessage
  };
}

export function updateService(id, serviceData) {
  const service = serviceData;
  service._id = id;
  return {
    type: SERVICE_UPDATE,
    payload: service,
  };
}

export function updateServiceRequest() {
  return {
    type: SERVICE_UPDATE_REQUEST
  };
}

export function updateServiceSuccess(response) {
  let errorMessage = '';
  if (response.status === 'error') {
    errorMessage = response.message;
  }
  return {
    type: SERVICE_UPDATE_SUCCESS,
    serviceUpdateStatus: response.status,
    errorMessage
  };
}

export function updateServiceError(response) {
  let errorMessage = '';
  if (response.status === 'error') {
    errorMessage = response.message;
  }
  return {
    type: SERVICE_UPDATE_ERROR,
    serviceUpdateStatus: 'error',
    errorMessage
  };
}

export function deleteService(id) {
  return {
    type: SERVICE_DELETE,
    payload: id
  };
}

export function serviceDeleteRequest() {
  return {
    type: SERVICE_DELETE_REQUEST
  };
}

export function serviceDeleteSuccess(response) {
  return {
    type: SERVICE_DELETE_SUCCESS,
    serviceDeleteStatus: response.status
  };
}

export function serviceDeleteError() {
  return {
    type: SERVICE_DELETE_ERROR
  };
}

export function clearStore() {
  return {
    type: SERVICE_CLEAR_STORE
  };
}

export function updateStatus(id, statusUpdateData) {
  const statusData = statusUpdateData;
  return {
    type: STATUS_UPDATE,
    status: statusData.status,
    id: id
  };
}

export function updateStatusRequest() {
  return {
    type: STATUS_UPDATE_REQUEST
  };
}

export function updateStatusSuccess(response) {
  let errorMessage = '';
  if (response.status === 'error') {
    errorMessage = response.message;
  }
  return {
    type: STATUS_UPDATE_SUCCESS,
    statusUpdateStatus: response.status,
    errorMessage
  };
}

export function updateStatusError(response) {
  let errorMessage = '';
  if (response.status === 'error') {
    errorMessage = response.message;
  }
  return {
    type: STATUS_UPDATE_ERROR,
    statusUpdateStatus: 'error',
    errorMessage
  };
}
