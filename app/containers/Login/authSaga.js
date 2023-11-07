import {
  all, call, put, takeEvery, fork
} from 'redux-saga/effects';
import {
  EMAIL_EXIST, AUTH_ADMIN, USER_PROFILE, FORGOT_PASSWORD, GET_OTP
} from './constants';
import API from '../../config/axiosConfig';
import * as URL from '../../lib/apiUrls';
import {
  authRequest,
  authSuccess,
  authError,
  emailExistRequest,
  emailExistSuccess,
  emailExistError,
  userProfileRequest,
  userProfileSuccess,
  userProfileError,
  forgotPasswordSuccess,
  forgotPasswordError,
  forgotPasswordRequest,
  getOtpRequest,
  getOtpSuccess,
  getOtpError
} from './authActions';

export function* emailExistAsync(action) {
  try {
    yield put(emailExistRequest());
    const data = yield call(() => API.post(URL.EMAIL_EXIST, action.payload));
    yield put(emailExistSuccess(data));
  } catch (error) {
    yield put(emailExistError());
  }
}

export function* authAsync(action) {
  try {
    yield put(authRequest());
    const data = yield call(() => API.post(URL.LOGIN, action.payload));
    yield put(authSuccess(data));
  } catch (error) {
    yield put(authError());
  }
}

export function* userProfileAsync() {
  try {
    yield put(userProfileRequest());
    const data = yield call(() => API.get(URL.USER_PROFILE));
    yield put(userProfileSuccess(data));
  } catch (error) {
    yield put(userProfileError());
  }
}

export function* forgotPasswordAsync(action) {
  try {
    yield put(forgotPasswordRequest());
    const data = yield call(() => API.put(URL.FORGOT_PASSWORD, action.payload));
    yield put(forgotPasswordSuccess(data));
  } catch (error) {
    yield put(forgotPasswordError());
  }
}

export function* getOtpAsync(action) {
  try {
    yield put(getOtpRequest());
    const data = yield call(() => API.put(URL.GET_OTP, action.payload));
    yield put(getOtpSuccess(data));
  } catch (error) {
    yield put(getOtpError());
  }
}

function* authRootSaga() {
  yield all([
    yield takeEvery(EMAIL_EXIST, emailExistAsync),
    yield takeEvery(AUTH_ADMIN, authAsync),
    yield takeEvery(USER_PROFILE, userProfileAsync),
    yield takeEvery(FORGOT_PASSWORD, forgotPasswordAsync),
    yield takeEvery(GET_OTP, getOtpAsync)
  ]);
}

const authSagas = [
  fork(authRootSaga),
];

export default authSagas;
