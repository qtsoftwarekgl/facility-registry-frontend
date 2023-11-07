import {
  all, call, put, takeEvery, fork
} from 'redux-saga/effects';
import _ from 'lodash';
import { FETCH_SECTORS } from './constants';
import {
  fetchSectorsRequest,
  fetchSectorsSuccess,
  fetchSectorsError
} from './sectorActions';
import API from '../../../config/axiosConfig';
import * as URL from '../../../lib/apiUrls';

export function* fetchSectorsAsync(action) {
  const params = _.pickBy(action.payload, _.identity);
  try {
    yield put(fetchSectorsRequest());
    const data = yield call(() => API.get(`${URL.SECTORS_LIST}?fields=name,code,districtId,status`, { params }));
    yield put(fetchSectorsSuccess(data));
  } catch (error) {
    yield put(fetchSectorsError());
  }
}

function* sectorRootSaga() {
  yield all([
    yield takeEvery(FETCH_SECTORS, fetchSectorsAsync)
  ]);
}

const sectorSagas = [
  fork(sectorRootSaga),
];

export default sectorSagas;
