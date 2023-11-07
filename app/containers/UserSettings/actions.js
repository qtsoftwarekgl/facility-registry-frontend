/*
 *
 * UserSettings actions
 *
 */

import {
  DEFAULT_ACTION,
  FETCH_USERS,
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_ERROR
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION
  };
}

export function fetchUsers() {
  return {
    type: FETCH_USERS
  };
}

export function fetchUsersRequest() {
  return {
    type: FETCH_USERS_REQUEST
  };
}

export function fetchUsersSuccess(users) {
  return {
    type: FETCH_USERS_SUCCESS,
    users
  };
}

export function fetchUsersError() {
  return {
    type: FETCH_USERS_ERROR
  };
}
