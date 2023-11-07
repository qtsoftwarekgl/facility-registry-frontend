import {
  FETCH_SECTORS,
  FETCH_SECTORS_REQUEST,
  FETCH_SECTORS_SUCCESS,
  FETCH_SECTORS_ERROR
} from './constants';


export function fetchSectors(districtId) {
  return {
    type: FETCH_SECTORS,
    payload: {
      districtId
    }
  };
}

export function fetchSectorsRequest() {
  return {
    type: FETCH_SECTORS_REQUEST
  };
}

export function fetchSectorsSuccess(response) {
  return {
    type: FETCH_SECTORS_SUCCESS,
    sectors: response ? response.data : []
  };
}

export function fetchSectorsError() {
  return {
    type: FETCH_SECTORS_ERROR
  };
}
