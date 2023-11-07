import { fromJS } from 'immutable';
import {
  AUTH_ADMIN_REQUEST,
  AUTH_ADMIN_SUCCESS,
  AUTH_ADMIN_ERROR,
  AUTH_ADMIN_CLEAR,
  EMAIL_EXIST_REQUEST,
  EMAIL_EXIST_SUCCESS,
  EMAIL_EXIST_ERROR,
  EMAIL_EXIST_CLEAR,
  USER_PROFILE_SUCCESS,
  USER_PROFILE_ERROR,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_ERROR,
  GET_OTP_ERROR,
  GET_OTP_REQUEST,
  GET_OTP_SUCCESS,
  GET_OTP_CLEAR,
  FORGOT_PASSWORD_CLEAR
} from './constants';

export const initialState = fromJS({});

function authReducer(state = initialState, action) {
  switch (action.type) {
    case AUTH_ADMIN_REQUEST:
      return Object.assign({}, state, {
        loading: true
      });
    case AUTH_ADMIN_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        authSuccess: action.authSuccess,
        authMessage: action.authMessage,
        authResponse: action.authResponse
      });
    case AUTH_ADMIN_ERROR:
      return Object.assign({}, state, {
        loading: false,
        error: true
      });
    case AUTH_ADMIN_CLEAR:
      return Object.assign({}, state, {
        loading: false,
        error: true,
        authSuccess: '',
        authMessage: '',
        authResponse: ''
      });
    case EMAIL_EXIST_REQUEST:
      return Object.assign({}, state, {
        checkingEmail: true
      });
    case EMAIL_EXIST_SUCCESS:
      return Object.assign({}, state, {
        checkingEmail: false,
        emailExist: action.emailExist,
        message: action.message
      });
    case EMAIL_EXIST_ERROR:
      return Object.assign({}, state, {
        checkingEmail: false,
        emailExist: false,
        error: true
      });
    case EMAIL_EXIST_CLEAR:
      return Object.assign({}, state, {
        checkingEmail: false,
        error: true,
        emailExist: ''
      });
    case USER_PROFILE_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        profileData: action.profileData
      });
    case USER_PROFILE_ERROR:
      return Object.assign({}, state, {
        loading: false,
        profileData: {}
      });
    case FORGOT_PASSWORD_REQUEST:
      return Object.assign({}, state, {
        loading: true
      });
    case FORGOT_PASSWORD_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        forgotPasswordStatus: action.forgotPasswordStatus
      });
    case FORGOT_PASSWORD_ERROR:
      return Object.assign({}, state, {
        loading: false,
      });
    case FORGOT_PASSWORD_CLEAR:
      return Object.assign({}, state, {
        forgotPasswordStatus: '',
      });
    case GET_OTP_REQUEST:
      return Object.assign({}, state, {
        loading: true
      });
    case GET_OTP_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        otpStatus: action.otpStatus
      });
    case GET_OTP_ERROR:
      return Object.assign({}, state, {
        loading: false,
      });
    case GET_OTP_CLEAR:
      return Object.assign({}, state, {
        loading: false,
        otpStatus: ''
      });
    default:
      return state;
  }
}

export default authReducer;
