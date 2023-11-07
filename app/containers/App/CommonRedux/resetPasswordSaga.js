import {
  all, call, put, takeEvery, fork
} from 'redux-saga/effects';
import API from '../../../config/axiosConfig';
import * as URL from '../../../lib/apiUrls';
import { RESET_PASSWORD } from './constants';
import {
  resetPasswordRequest,
  resetPasswordSuccess,
  resetPasswordError
} from './resetPasswordAction';

export function* resetPasswordAsync(action) {
  try {
    yield put(resetPasswordRequest());
    const data = yield call(() => API.put(`${URL.RESET_PASSWORD}`, action.payload));
    yield put(resetPasswordSuccess(data));
  } catch (error) {
    yield put(resetPasswordError());
  }
}

function* resetPasswordRootSaga() {
  yield all([
    yield takeEvery(RESET_PASSWORD, resetPasswordAsync)
  ]);
}

const resetPasswordSagas = [
  fork(resetPasswordRootSaga),
];

export default resetPasswordSagas;
