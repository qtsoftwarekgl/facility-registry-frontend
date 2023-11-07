import {
  all, call, put, takeEvery, fork
} from 'redux-saga/effects';
import { FETCH_USER_LIST } from './constants';
import API from '../../../config/axiosConfig';
import * as URL from '../../../lib/apiUrls';
import {
  fetchUserListRequest,
  fetchUserListSuccess,
  fetchUserListError
} from './userListActions';

export function* fetchUserListAsync(action) {
  const {
    page,
    limit,
    name,
    email,
    role,
    facilityName,
    ministry,
    status
  } = action.payload;

  let url = `${URL.USERS}?page=${page}&limit=${limit}`;
  if (name) {
    url = `${url}&name=${name}`;
  }
  if (email) {
    url = `${url}&email=${email}`;
  }
  if (role) {
    url = `${url}&role=${role}`;
  }
  if (facilityName) {
    url = `${url}&facilityName=${facilityName}`;
  }
  if (ministry) {
    url = `${url}&ministry=${ministry}`;
  }
  if (status) {
    url = `${url}&status=${status}`;
  }

  try {
    yield put(fetchUserListRequest());
    const data = yield call(() => API.get(url));
    yield put(fetchUserListSuccess(data));
  } catch (error) {
    yield put(fetchUserListError());
  }
}

function* userListRootSaga() {
  yield all([
    yield takeEvery(FETCH_USER_LIST, fetchUserListAsync)
  ]);
}

const userListSagas = [
  fork(userListRootSaga),
];

export default userListSagas;
