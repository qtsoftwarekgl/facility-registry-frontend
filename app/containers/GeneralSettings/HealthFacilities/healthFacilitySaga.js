import {
  all, call, put, takeEvery, fork
} from 'redux-saga/effects';
import {
  LIST_HEALTH_FACILITIES,
  CREATE_HEALTH_FACILITY,
  FACILITY_DELETE,
  FACILITY_UPDATE,
  FACILITY_ASSET
} from './constants';
import {
  fetchHealthFacilitiesRequest,
  fetchHealthFacilitiesSuccess,
  fetchHealthFacilitiesError,
  createHealthFacilityRequest,
  createHealthFacilitySuccess,
  createHealthFacilityError,
  facilityDeleteRequest,
  facilityDeleteSuccess,
  facilityDeleteError,
  updateHealthFacilityRequest,
  updateHealthFacilitySuccess,
  updateHealthFacilityError,
  facilityAssetRequest,
  facilityAssetSuccess,
  facilityAssetError
} from './healthFacilityActions';
import API from '../../../config/axiosConfig';
import * as URL from '../../../lib/apiUrls';


export function* fetchHealthFacilitiesAsync(action) {
  const params = action.payload;
  try {
    yield put(fetchHealthFacilitiesRequest());
    const data = yield call(() => API.get(URL.HEALTH_FACILITIES, { params }));
    yield put(fetchHealthFacilitiesSuccess(data));
  } catch (error) {
    yield put(fetchHealthFacilitiesError());
  }
}

export function* createHealthFacility(action) {
  try {
    yield put(createHealthFacilityRequest());
    const data = yield call(() => API.post(URL.HEALTH_FACILITIES, action.payload));
    yield put(createHealthFacilitySuccess(data));
  } catch (error) {
    yield put(createHealthFacilityError(error));
  }
}

export function* updateHealthFacility(action) {
  try {
    yield put(updateHealthFacilityRequest());
    const data = yield call(() => API.put(`${URL.HEALTH_FACILITIES}/${action.id}`, action.payload));
    yield put(updateHealthFacilitySuccess(data));
  } catch (error) {
    yield put(updateHealthFacilityError(error));
  }
}

export function* deleteHealthFacility(action) {
  try {
    yield put(facilityDeleteRequest());
    const data = yield call(() => API.delete(`${URL.HEALTH_FACILITIES}/${action.payload}`));
    yield put(facilityDeleteSuccess(data));
  } catch (error) {
    yield put(facilityDeleteError());
  }
}

export function* facilityAsset(action) {
  try {
    yield put(facilityAssetRequest());
    const data = yield call(() => API.post(`${URL.HEALTH_FACILITIES}/handle-facility-assets`, action.payload));
    yield put(facilityAssetSuccess(data));
  } catch (error) {
    yield put(facilityAssetError(error));
  }
}

function* healthFacilitiesRootSaga() {
  yield all([
    yield takeEvery(LIST_HEALTH_FACILITIES, fetchHealthFacilitiesAsync),
    yield takeEvery(CREATE_HEALTH_FACILITY, createHealthFacility),
    yield takeEvery(FACILITY_DELETE, deleteHealthFacility),
    yield takeEvery(FACILITY_UPDATE, updateHealthFacility),
    yield takeEvery(FACILITY_ASSET, facilityAsset)
  ]);
}

const healthFacilitiesSagas = [
  fork(healthFacilitiesRootSaga),
];

export default healthFacilitiesSagas;
