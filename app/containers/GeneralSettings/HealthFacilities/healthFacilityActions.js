import _ from 'lodash';
import {
  LIST_HEALTH_FACILITIES,
  FETCH_HEALTH_FACILITIES_REQUEST,
  FETCH_HEALTH_FACILITIES_SUCCESS,
  FETCH_HEALTH_FACILITIES_ERROR,
  CREATE_HEALTH_FACILITY,
  CREATE_HEALTH_FACILITY_REQUEST,
  CREATE_HEALTH_FACILITY_SUCCESS,
  CREATE_HEALTH_FACILITY_ERROR,
  FACILITY_DELETE,
  FACILITY_DELETE_REQUEST,
  FACILITY_DELETE_SUCCESS,
  FACILITY_DELETE_ERROR,
  FACILITY_UPDATE,
  FACILITY_UPDATE_REQUEST,
  FACILITY_UPDATE_SUCCESS,
  FACILITY_UPDATE_ERROR,
  FACILITY_CLEAR_STORE,
  FACILITY_ASSET,
  FACILITY_ASSET_ERROR,
  FACILITY_ASSET_SUCCESS,
  FACILITY_ASSET_REQUEST
} from './constants';

export function fetchHealthFacilities(params) {
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
    type: LIST_HEALTH_FACILITIES,
    payload
  };
}

export function fetchHealthFacilitiesRequest() {
  return {
    type: FETCH_HEALTH_FACILITIES_REQUEST
  };
}

export function fetchHealthFacilitiesSuccess(response) {
  return {
    type: FETCH_HEALTH_FACILITIES_SUCCESS,
    healthFacilities: response.status === 'ok' ? response.data : [],
    count: response.status === 'ok' ? response.count : 0,
  };
}

export function fetchHealthFacilitiesError() {
  return {
    type: FETCH_HEALTH_FACILITIES_ERROR
  };
}

export function createHealthFacility(facilityData) {
  return {
    type: CREATE_HEALTH_FACILITY,
    payload: facilityData
  };
}

export function createHealthFacilityRequest() {
  return {
    type: CREATE_HEALTH_FACILITY_REQUEST
  };
}

export function createHealthFacilitySuccess(response) {
  let errorMessage = '';
  if (response.status === 'error') {
    errorMessage = response.message;
  }
  return {
    type: CREATE_HEALTH_FACILITY_SUCCESS,
    facilityCreatedStatus: response.status,
    errorMessage
  };
}

export function createHealthFacilityError(response) {
  let errorMessage = '';
  if (response.status === 'error') {
    errorMessage = response.message;
  }
  return {
    type: CREATE_HEALTH_FACILITY_ERROR,
    facilityCreatedStatus: response.status,
    errorMessage
  };
}

export function updateHealthFacility(id, facilityData) {
  const facility = facilityData;
  delete facility._id;
  return {
    type: FACILITY_UPDATE,
    payload: facility,
    id
  };
}

export function updateHealthFacilityRequest() {
  return {
    type: FACILITY_UPDATE_REQUEST
  };
}

export function updateHealthFacilitySuccess(response) {
  let errorMessage = '';
  if (response.status === 'error') {
    errorMessage = response.message;
  }
  return {
    type: FACILITY_UPDATE_SUCCESS,
    facilityUpdateStatus: response.status,
    errorMessage
  };
}

export function updateHealthFacilityError(response) {
  let errorMessage = '';
  if (response.status === 'error') {
    errorMessage = response.message;
  }
  return {
    type: FACILITY_UPDATE_ERROR,
    facilityUpdateStatus: 'error',
    errorMessage
  };
}

export function deleteFacility(id) {
  return {
    type: FACILITY_DELETE,
    payload: id
  };
}

export function facilityDeleteRequest() {
  return {
    type: FACILITY_DELETE_REQUEST
  };
}

export function facilityDeleteSuccess(response) {
  return {
    type: FACILITY_DELETE_SUCCESS,
    facilityDeleteStatus: response.status
  };
}

export function facilityDeleteError() {
  return {
    type: FACILITY_DELETE_ERROR
  };
}

export function clearStore() {
  return {
    type: FACILITY_CLEAR_STORE
  };
}

export function facilityAsset(facilityData) {
  return {
    type: FACILITY_ASSET,
    payload: facilityData
  };
}

export function facilityAssetRequest() {
  return {
    type: FACILITY_ASSET_REQUEST
  };
}

export function facilityAssetSuccess(response) {
  let errorMessage = '';
  if (response.status === 'error') {
    errorMessage = response.message;
  }
  return {
    type: FACILITY_ASSET_SUCCESS,
    facilityAssetStatus: response.status,
    errorMessage
  };
}

export function facilityAssetError(response) {
  let errorMessage = '';
  if (response.status === 'error') {
    errorMessage = response.message;
  }
  return {
    type: FACILITY_ASSET_ERROR,
    facilityAssetStatus: 'error',
    errorMessage
  };
}
