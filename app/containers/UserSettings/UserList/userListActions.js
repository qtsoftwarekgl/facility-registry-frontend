import {
  FETCH_USER_LIST,
  FETCH_USER_LIST_REQUEST,
  FETCH_USER_LIST_SUCCESS,
  FETCH_USER_LIST_ERROR
} from './constants';


export function fetchUserList(params) {
  return {
    type: FETCH_USER_LIST,
    payload: {
      page: params.page || 1,
      limit: params.limit || 20,
      name: params.name || '',
      email: params.email || '',
      role: params.role || '',
      facilityName: params.facilityName || '',
      ministry: params.ministry || '',
      status: params.status || ''
    }
  };
}

export function fetchUserListRequest() {
  return {
    type: FETCH_USER_LIST_REQUEST
  };
}

export function fetchUserListSuccess(response) {
  return {
    type: FETCH_USER_LIST_SUCCESS,
    userList: response ? response.data : [],
    count: response ? response.count : 0
  };
}

export function fetchUserListError() {
  return {
    type: FETCH_USER_LIST_ERROR
  };
}
