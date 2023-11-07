import {
  FETCH_PROVINCES,
  FETCH_PROVINCES_REQUEST,
  FETCH_PROVINCES_SUCCESS,
  FETCH_PROVINCES_ERROR
} from './constants';


export function fetchProvinces() {
  return {
    type: FETCH_PROVINCES,
    payload: {
      page: 1,
      limit: 20
    }
  };
}

export function fetchProvincesRequest() {
  return {
    type: FETCH_PROVINCES_REQUEST
  };
}

export function fetchProvincesSuccess(response) {
  return {
    type: FETCH_PROVINCES_SUCCESS,
    provinces: response ? response.data : []
  };
}

export function fetchProvincesError() {
  return {
    type: FETCH_PROVINCES_ERROR
  };
}
