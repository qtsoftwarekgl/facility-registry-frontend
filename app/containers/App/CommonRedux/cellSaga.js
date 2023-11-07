import {
  all, call, put, takeEvery, fork
} from 'redux-saga/effects';
import _ from 'lodash';
import { FETCH_CELLS } from './constants';
import {
  fetchCellsRequest,
  fetchCellsSuccess,
  fetchCellsError
} from './cellActions';
import API from '../../../config/axiosConfig';
import * as URL from '../../../lib/apiUrls';

export function* fetchCellsAsync(action) {
  const params = _.pickBy(action.payload, _.identity);
  try {
    yield put(fetchCellsRequest());
    const data = yield call(() => API.get(`${URL.CELLS_LIST}?fields=name,code,sectorId,status`, { params }));
    yield put(fetchCellsSuccess(data));
  } catch (error) {
    yield put(fetchCellsError());
  }
}

function* cellsRootSaga() {
  yield all([
    yield takeEvery(FETCH_CELLS, fetchCellsAsync)
  ]);
}

const cellsSagas = [
  fork(cellsRootSaga),
];

export default cellsSagas;
