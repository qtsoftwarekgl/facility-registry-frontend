import {
  FETCH_DISTRICT,
  FETCH_DISTRICT_REQUEST,
  FETCH_DISTRICT_SUCCESS,
  FETCH_DISTRICT_ERROR
} from './constants';

export function fetchDistricts(provinceId) {
  return {
    type: FETCH_DISTRICT,
    payload: {
      provinceId
    }
  };
}

export function fetchDistrictsRequest() {
  return {
    type: FETCH_DISTRICT_REQUEST
  };
}

export function fetchDistrictsSuccess(response) {
  return {
    type: FETCH_DISTRICT_SUCCESS,
    districts: response ? response.data : []
  };
}

export function fetchDistrictsError() {
  return {
    type: FETCH_DISTRICT_ERROR
  };
}
