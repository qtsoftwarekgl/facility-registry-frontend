import {
  FETCH_VILLAGES,
  FETCH_VILLAGES_REQUEST,
  FETCH_VILLAGES_SUCCESS,
  FETCH_VILLAGES_ERROR
} from './constants';


export function fetchVillages(cellId) {
  return {
    type: FETCH_VILLAGES,
    payload: {
      page: 1,
      limit: 20,
      cellId
    }
  };
}

export function fetchVillagesRequest() {
  return {
    type: FETCH_VILLAGES_REQUEST
  };
}

export function fetchVillagesSuccess(response) {
  return {
    type: FETCH_VILLAGES_SUCCESS,
    villages: response ? response.data : []
  };
}

export function fetchVillagesError() {
  return {
    type: FETCH_VILLAGES_ERROR
  };
}
