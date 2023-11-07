import {
  AUTH_ADMIN,
  AUTH_ADMIN_REQUEST,
  AUTH_ADMIN_SUCCESS,
  AUTH_ADMIN_ERROR,
  AUTH_ADMIN_CLEAR,
  EMAIL_EXIST,
  EMAIL_EXIST_REQUEST,
  EMAIL_EXIST_SUCCESS,
  EMAIL_EXIST_ERROR,
  EMAIL_EXIST_CLEAR,
  USER_PROFILE,
  USER_PROFILE_REQUEST,
  USER_PROFILE_SUCCESS,
  USER_PROFILE_ERROR,
  FORGOT_PASSWORD,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_ERROR,
  GET_OTP,
  GET_OTP_ERROR,
  GET_OTP_REQUEST,
  GET_OTP_SUCCESS,
  GET_OTP_CLEAR,
  FORGOT_PASSWORD_CLEAR
} from './constants';
import { SESSION } from '../../lib/constants';

export function auth(authData) {
  return {
    type: AUTH_ADMIN,
    payload: authData
  };
}

export function authRequest() {
  return {
    type: AUTH_ADMIN_REQUEST
  };
}

export function authSuccess(response) {
  if (response && response.status === 'ok') {
    if (response.data && response.data.token) {
      localStorage.setItem(SESSION.TOKEN, response.data.token);
    }
  }
  return {
    type: AUTH_ADMIN_SUCCESS,
    authSuccess: response ? response.status : '',
    authMessage: response ? response.message : '',
    authResponse : response ? response.data : {}
  };
}

export function authError() {
  return {
    type: AUTH_ADMIN_ERROR
  };
}

export function authClear() {
  return {
    type: AUTH_ADMIN_CLEAR
  };
}

export function emailExist(email) {
  return {
    type: EMAIL_EXIST,
    payload: {
      email
    }
  };
}

export function emailExistRequest() {
  return {
    type: EMAIL_EXIST_REQUEST
  };
}

export function emailExistSuccess(response) {
  return {
    type: EMAIL_EXIST_SUCCESS,
    emailExist: response ? response.status : '',
    message: response.message
  };
}

export function emailExistError() {
  return {
    type: EMAIL_EXIST_ERROR
  };
}

export function emailExistClear() {
  return {
    type: EMAIL_EXIST_CLEAR
  };
}

export function userProfile() {
  return {
    type: USER_PROFILE
  };
}

export function userProfileRequest() {
  return {
    type: USER_PROFILE_REQUEST
  };
}

export function userProfileSuccess(response) {
  return {
    type: USER_PROFILE_SUCCESS,
    profileData: response && response.status === 'ok' ? response.data : {}
  };
}

export function userProfileError() {
  return {
    type: USER_PROFILE_ERROR
  };
}
export function forgotPassword(forgotData) {
  return {
    type: FORGOT_PASSWORD,
    payload: forgotData
  };
}

export function forgotPasswordRequest() {
  return {
    type: FORGOT_PASSWORD_REQUEST
  };
}

export function forgotPasswordSuccess(response) {
  return {
    type: FORGOT_PASSWORD_SUCCESS,
    forgotPasswordStatus: response.status,
    passwordData: response && response.status === 'ok' ? response.data : {}
  };
}

export function forgotPasswordError() {
  return {
    type: FORGOT_PASSWORD_ERROR
  };
}

export function forgotPasswordClear() {
  return {
    type: FORGOT_PASSWORD_CLEAR
  };
}

export function getOtp(otpData) {
  return {
    type: GET_OTP,
    payload: otpData
  };
}

export function getOtpRequest() {
  return {
    type: GET_OTP_REQUEST
  };
}

export function getOtpSuccess(response) {
  return {
    type: GET_OTP_SUCCESS,
    otpStatus: response.status,
    otpData: response && response.status === 'ok' ? response.data : {}
  };
}

export function getOtpError() {
  return {
    type: GET_OTP_ERROR
  };
}

export function getOtpClear() {
  return {
    type: GET_OTP_CLEAR
  };
}
