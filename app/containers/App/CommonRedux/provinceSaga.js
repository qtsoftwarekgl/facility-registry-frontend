import {
  all, call, put, takeEvery, fork
} from 'redux-saga/effects';
import { FETCH_PROVINCES } from './constants';
import {
  fetchProvincesRequest,
  fetchProvincesSuccess,
  fetchProvincesError
} from './provinceActions';
import API from '../../../config/axiosConfig';
import * as URL from '../../../lib/apiUrls';

export function* fetchProvincesAsync() {
  try {
    yield put(fetchProvincesRequest());
    const data = yield call(() => API.get(`${URL.PROVINCES_LIST}?fields=name,code`));
    yield put(fetchProvincesSuccess(data));
  } catch (error) {
    yield put(fetchProvincesError());
  }
}

function* provinceRootSaga() {
  yield all([
    yield takeEvery(FETCH_PROVINCES, fetchProvincesAsync)
  ]);
}

const provinceSagas = [
  fork(provinceRootSaga),
];

export default provinceSagas;
