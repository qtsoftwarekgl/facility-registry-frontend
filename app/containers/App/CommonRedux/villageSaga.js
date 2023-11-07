import {
  all, call, put, takeEvery, fork
} from 'redux-saga/effects';
import _ from 'lodash';
import { FETCH_VILLAGES } from './constants';
import {
  fetchVillagesRequest,
  fetchVillagesSuccess,
  fetchVillagesError
} from './villageActions';
import API from '../../../config/axiosConfig';
import * as URL from '../../../lib/apiUrls';

export function* fetchVillagesAsync(action) {
  const params = _.pickBy(action.payload, _.identity);
  try {
    yield put(fetchVillagesRequest());
    const data = yield call(() => API.get(`${URL.VILLAGES_LIST}?fields=name,code,cellId,status`, { params }));
    yield put(fetchVillagesSuccess(data));
  } catch (error) {
    yield put(fetchVillagesError());
  }
}


function* villageRootSaga() {
  yield all([
    yield takeEvery(FETCH_VILLAGES, fetchVillagesAsync),
  ]);
}

const villagesSagas = [
  fork(villageRootSaga),
];

export default villagesSagas;
