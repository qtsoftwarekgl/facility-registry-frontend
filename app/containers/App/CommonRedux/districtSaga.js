import {
  all, call, put, takeEvery, fork
} from 'redux-saga/effects';
import _ from 'lodash';
import { FETCH_DISTRICT } from './constants';
import {
  fetchDistrictsRequest,
  fetchDistrictsSuccess,
  fetchDistrictsError
} from './districtActions';
import API from '../../../config/axiosConfig';
import * as URL from '../../../lib/apiUrls';

export function* fetchDistrictsAsync(action) {
  const params = _.pickBy(action.payload, _.identity);
  try {
    yield put(fetchDistrictsRequest());
    const data = yield call(() => API.get(`${URL.DISTRICTS_LIST}?fields=name,code,provinceId,status`, { params }));
    yield put(fetchDistrictsSuccess(data));
  } catch (error) {
    yield put(fetchDistrictsError());
  }
}

function* distictsRootSaga() {
  yield all([
    yield takeEvery(FETCH_DISTRICT, fetchDistrictsAsync)
  ]);
}

const districtSagas = [
  fork(distictsRootSaga),
];

export default districtSagas;
