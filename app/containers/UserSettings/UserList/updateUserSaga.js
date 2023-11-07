import {
  all, call, put, takeEvery, fork
} from 'redux-saga/effects';
import { UPDATE_USER } from './constants';
import API from '../../../config/axiosConfig';
import * as URL from '../../../lib/apiUrls';
import {
  updateUserRequest,
  updateUserSuccess,
  updateUserError
} from './updateUserActions';


export function* updateUserAsync(action) {
  const { id, userData } = action.payload;
  const url = `${URL.USERS}/${id}`;
  try {
    yield put(updateUserRequest());
    const data = yield call(() => API.put(url, userData));
    yield put(updateUserSuccess(data));
  } catch (error) {
    yield put(updateUserError(error));
  }
}

function* updateUserRootSaga() {
  yield all([
    yield takeEvery(UPDATE_USER, updateUserAsync)
  ]);
}

const updateUserSagas = [
  fork(updateUserRootSaga),
];

export default updateUserSagas;
