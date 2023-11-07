import {
  FETCH_EMBASSY,
  FETCH_EMBASSY_REQUEST,
  FETCH_EMBASSY_SUCCESS,
  FETCH_EMBASSY_ERROR
} from './constants';


export function fetchEmbassies() {
  return {
    type: FETCH_EMBASSY,
    payload: {
      page: 1,
      limit: 20
    }
  };
}

export function fetchEmbassiesRequest() {
  return {
    type: FETCH_EMBASSY_REQUEST
  };
}

export function fetchEmbassiesSuccess(response) {
  return {
    type: FETCH_EMBASSY_SUCCESS,
    embassies: response ? response.data : []
  };
}

export function fetchEmbassiesError() {
  return {
    type: FETCH_EMBASSY_ERROR
  };
}
