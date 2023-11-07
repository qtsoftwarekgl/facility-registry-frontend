import {
  all, call, put, takeEvery, fork
} from 'redux-saga/effects';
import { FETCH_EMBASSY } from './constants';
import {
  fetchEmbassiesRequest,
  fetchEmbassiesSuccess,
  fetchEmbassiesError
} from './embassyActions';
import API from '../../../config/axiosConfig';
import * as URL from '../../../lib/apiUrls';

export function* fetchEmbassiesAsync(action) {
  try {
    yield put(fetchEmbassiesRequest());
    const data = yield call(() => API.get(`${URL.EMBASSIES}?feilds=name,cityName,status`, { params: action.payload }));
    yield put(fetchEmbassiesSuccess(data));
  } catch (error) {
    yield put(fetchEmbassiesError());
  }
}

function* embassyRootSaga() {
  yield all([
    yield takeEvery(FETCH_EMBASSY, fetchEmbassiesAsync)
  ]);
}

const embassySagas = [
  fork(embassyRootSaga),
];

export default embassySagas;
