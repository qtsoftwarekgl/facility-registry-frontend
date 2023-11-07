import {
  all, call, put, takeEvery, fork
} from 'redux-saga/effects';
import { FETCH_CITIZEN } from './constants';
import {
  fetchCitizenRequest,
  fetchCitizenSuccess,
  fetchCitizenError
} from './citizenActions';
import API from '../../../config/axiosConfig';
import * as URL from '../../../lib/apiUrls';

export function* fetchCitizenAsync(action) {
  const { docType, docNumber } = action.payload;
  const docData = {
    documentType: docType,
    documentNumber: docNumber
  };
  try {
    yield put(fetchCitizenRequest());
    const data = yield call(() => API.post(URL.GET_CITIZEN, docData));
    yield put(fetchCitizenSuccess(data));
  } catch (error) {
    yield put(fetchCitizenError());
  }
}

function* citizenRootSaga() {
  yield all([
    yield takeEvery(FETCH_CITIZEN, fetchCitizenAsync)
  ]);
}

const citizenSagas = [
  fork(citizenRootSaga),
];

export default citizenSagas;
