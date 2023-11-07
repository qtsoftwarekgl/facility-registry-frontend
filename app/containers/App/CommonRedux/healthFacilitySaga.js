import {
  all, call, put, takeEvery, fork
} from 'redux-saga/effects';
import { FETCH_HEALTH_FACILITIES } from './constants';
import {
  fetchHealthFacilitiesRequest,
  fetchHealthFacilitiesSuccess,
  fetchHealthFacilitiesError
} from './healthFacilityActions';
import API from '../../../config/axiosConfig';
import * as URL from '../../../lib/apiUrls';

export function* fetchHealthFacilitiesAsync(action) {
  try {
    yield put(fetchHealthFacilitiesRequest());
    const data = yield call(() => API.get(`${URL.HEALTH_FACILITIES}?fields=name,status`, { params: action.payload }));
    yield put(fetchHealthFacilitiesSuccess(data));
  } catch (error) {
    yield put(fetchHealthFacilitiesError());
  }
}

function* healthFacilitiesRootSaga() {
  yield all([
    yield takeEvery(FETCH_HEALTH_FACILITIES, fetchHealthFacilitiesAsync)
  ]);
}

const healthFacilitiesSagas = [
  fork(healthFacilitiesRootSaga),
];

export default healthFacilitiesSagas;
