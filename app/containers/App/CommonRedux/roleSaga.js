import {
  all, call, put, takeEvery, fork
} from 'redux-saga/effects';
import { FETCH_ROLE } from './constants';
import API from '../../../config/axiosConfig';
import * as URL from '../../../lib/apiUrls';
import {
  fetchRolesRequest,
  fetchRolesSuccess,
  fetchRolesError
} from './roleActions';


export function* fetchRolesAsync(action) {
  const {
    page,
    limit,
    name,
    role,
    ministry,
    status
  } = action.payload;

  let url = `${URL.ROlES}?fields=name,status,value,ministry,facilityType,role&page=${page}&limit=${limit}`;
  if (name) {
    url = `${url}&name=${name}`;
  }
  if (role) {
    url = `${url}&role=${role}`;
  }
  if (ministry) {
    url = `${url}&ministry=${ministry}`;
  }
  if (status) {
    url = `${url}&status=${status}`;
  }
  try {
    yield put(fetchRolesRequest());
    const data = yield call(() => API.get(url));
    yield put(fetchRolesSuccess(data));
  } catch (error) {
    yield put(fetchRolesError());
  }
}

function* roleRootSaga() {
  yield all([
    yield takeEvery(FETCH_ROLE, fetchRolesAsync)
  ]);
}

const roleSagas = [
  fork(roleRootSaga),
];

export default roleSagas;
