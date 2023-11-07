import {
  RESET_PASSWORD,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_ERROR,
  RESET_PASSWORD_CLEAR
} from './constants';

export function resetPassword(data) {
  return {
    type: RESET_PASSWORD,
    payload: data
  };
}

export function resetPasswordRequest() {
  return {
    type: RESET_PASSWORD_REQUEST
  };
}

export function resetPasswordSuccess(response) {
  return {
    type: RESET_PASSWORD_SUCCESS,
    passwordUpdated: response ? response.status : '',
    message: response ? response.message : ''
  };
}

export function resetPasswordError() {
  return {
    type: RESET_PASSWORD_ERROR
  };
}


export function resetPasswordClear() {
  return {
    type: RESET_PASSWORD_CLEAR
  };
}
