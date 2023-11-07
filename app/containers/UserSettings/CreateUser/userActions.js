import {
  CREATE_NEW_USER,
  CREATE_NEW_USER_REQUEST,
  CREATE_NEW_USER_SUCCESS,
  CREATE_NEW_USER_ERROR,
  CREATE_NEW_USER_CLEAR,
  EDIT_USER,
  EDIT_USER_REQUEST,
  EDIT_USER_SUCCESS,
  EDIT_USER_ERROR,
  EDIT_USER_CLEAR,
  GET_USER,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_ERROR,
} from './constants';


export function createNewUser(userData, usertype) {
  return {
    type: CREATE_NEW_USER,
    payload: userData,
    usertype
  };
}

export function createNewUserRequest() {
  return {
    type: CREATE_NEW_USER_REQUEST
  };
}

export function createNewUserSuccess(response) {
  return {
    type: CREATE_NEW_USER_SUCCESS,
    userCreated: response ? response.status : '',
    message: response ? response.message : ''
  };
}

export function createNewUserError() {
  return {
    type: CREATE_NEW_USER_ERROR
  };
}

export function createNewUserClear() {
  return {
    type: CREATE_NEW_USER_CLEAR
  };
}

export function editUser(userData, usertype, id) {
  return {
    type: EDIT_USER,
    payload: userData,
    id: id,
    usertype
  };
}

export function editUserRequest() {
  return {
    type: EDIT_USER_REQUEST
  };
}

export function editUserSuccess(response) {
  return {
    type: EDIT_USER_SUCCESS,
    userUpdated: response ? response.status : '',
    message: response ? response.message : ''
  };
}

export function editUserError() {
  return {
    type: EDIT_USER_ERROR
  };
}

export function editNewUserClear() {
  return {
    type: EDIT_USER_CLEAR
  };
}

export function getUser(id) {
  return {
    type: GET_USER,
    payload: {id: id},
    id: id
  };
}

export function getUserRequest() {
  return {
    type: GET_USER_REQUEST
  };
}

export function getUserSuccess(response) {
  return {
    type: GET_USER_SUCCESS,
    resultData: response.data ? response.data : {}
  };
}

export function getUserError() {
  return {
    type: GET_USER_ERROR
  };
}

