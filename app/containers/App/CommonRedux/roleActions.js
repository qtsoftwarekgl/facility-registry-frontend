import _ from 'lodash';
import {
  FETCH_ROLE,
  FETCH_ROLE_REQUEST,
  FETCH_ROLE_SUCCESS,
  FETCH_ROLE_ERROR
} from './constants';

export function fetchRoles(params) {
  const payload = {
    page: 1,
    limit: 20
  };
  if (!_.isEmpty(params)) {
    Object.keys(params).forEach((key) => {
      payload[key] = params[key];
    });
  }

  return {
    type: FETCH_ROLE,
    payload
  };
}

export function fetchRolesRequest() {
  return {
    type: FETCH_ROLE_REQUEST
  };
}

export function fetchRolesSuccess(roles) {
  return {
    type: FETCH_ROLE_SUCCESS,
    roles: roles ? roles.data : [],
    count: roles ? roles.count : 0
  };
}

export function fetchRolesError() {
  return {
    type: FETCH_ROLE_ERROR
  };
}
