import {
  FETCH_CITIZEN,
  FETCH_CITIZEN_REQUEST,
  FETCH_CITIZEN_SUCCESS,
  FETCH_CITIZEN_ERROR,
  CITIZEN_STORE_CLEAR
} from './constants';


export function fetchCitizen(docType, docNumber) {
  return {
    type: FETCH_CITIZEN,
    payload: {
      docType,
      docNumber
    }
  };
}

export function fetchCitizenRequest() {
  return {
    type: FETCH_CITIZEN_REQUEST
  };
}

export function fetchCitizenSuccess(response) {
  return {
    type: FETCH_CITIZEN_SUCCESS,
    citizen: response ? response.data : null,
    citizenMessage: response.status
  };
}

export function fetchCitizenError() {
  return {
    type: FETCH_CITIZEN_ERROR
  };
}
export function clearCitizenStore() {
  return {
    type: CITIZEN_STORE_CLEAR
  };
}
