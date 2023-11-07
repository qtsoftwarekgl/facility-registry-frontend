import _ from 'lodash';
import {
  FETCH_HEALTH_FACILITIES,
  FETCH_HEALTH_FACILITIES_REQUEST,
  FETCH_HEALTH_FACILITIES_SUCCESS,
  FETCH_HEALTH_FACILITIES_ERROR
} from './constants';


export function fetchHealthFacilities(params) {
  const payload = {
    page: 1,
    limit: 20
  };
  if (!_.isEmpty(params)) {
    Object.keys(params).forEach((key) => {
      payload[key] = params[key];
    });
  }

  return {
    type: FETCH_HEALTH_FACILITIES,
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
    healthFacilities: response ? response.data : [],
    count: response ? response.count : 0
  };
}

export function fetchHealthFacilitiesError() {
  return {
    type: FETCH_HEALTH_FACILITIES_ERROR
  };
}
