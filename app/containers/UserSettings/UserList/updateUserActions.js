import {
  UPDATE_USER,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  UPDATE_USER_CLEAR
} from './constants';

export function updateUser(id, userData) {
  return {
    type: UPDATE_USER,
    payload: {
      id,
      userData
    }
  };
}

export function updateUserRequest() {
  return {
    type: UPDATE_USER_REQUEST
  };
}

export function updateUserSuccess(response) {
  let errorMessage = '';
  if (response.status === 'error') {
    errorMessage = response.message;
  }
  return {
    type: UPDATE_USER_SUCCESS,
    userUpdated: response ? response.status : '',
    updateMessage: response ? response.message : '',
    errorMessage
  };
}

export function updateUserError(response) {
  let errorMessage = '';
  if (response.status === 'error') {
    errorMessage = response.message;
  }
  return {
    type: UPDATE_USER_ERROR,
    errorMessage
  };
}

export function updateUserClear() {
  return {
    type: UPDATE_USER_CLEAR
  };
}
