import * as types from '../constants/authConstants';

export const logout = () => ({
  type: types.LOGOUT_REQUEST
});

export const logoutSuccess = () => ({
  type: types.LOGOUT_SUCCESS
});

export const logoutFailure = error => ({
  type: types.LOGOUT_FAILURE,
  error
});
