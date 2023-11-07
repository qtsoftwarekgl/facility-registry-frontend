import { all, call, put, takeEvery, fork } from "redux-saga/effects";
import { FETCH_FACILITY_TC_LIST, FETCH_GET_PACKAGE_BY_CATEGOTY_LIST } from "./constants";
import API from "../../config/axiosConfig";
import * as URL from "../../lib/apiUrls";
import {
  fetchFacilitytcListRequest,
  fetchFacilitytcListtSuccess,
  fetchFacilitytcListtError,
  fetchPackagesByCategoryRequest,
  fetchPackagesByCategorySuccess,
  fetchPackagesByCategoryError
} from "./FacilitytcActions";

export function* fetchFacilitytcListAsync(action) {
  const { page, limit } = action.payload;
  let url = `${URL.FACILITY_TC}?page=${page}&limit=${limit}`;
  try {
    yield put(fetchFacilitytcListRequest());
    const data = yield call(() => API.get(url));
    yield put(fetchFacilitytcListtSuccess(data));
  } catch (error) {
    yield put(fetchFacilitytcListtError());
  }
}

export function* fetchGetPackageByCategoryAsync(action) {
  const { categoryId, status } = action.payload;
  let url = `${URL.GET_PACKAGES_BY_CATEGORY}?categoryId=${categoryId}&status=${status}`;
  try {
    yield put(fetchPackagesByCategoryRequest());
    const data = yield call(() => API.get(url));
    yield put(fetchPackagesByCategorySuccess(data));
  } catch (error) {
    yield put(fetchPackagesByCategoryError());
  }
}

function* facilitytcListRootSaga() {
  yield all([yield takeEvery(FETCH_FACILITY_TC_LIST, fetchFacilitytcListAsync)]);
  yield all([yield takeEvery(FETCH_GET_PACKAGE_BY_CATEGOTY_LIST, fetchGetPackageByCategoryAsync)]);
}

const facilitytcListSagas = [fork(facilitytcListRootSaga)];

export default facilitytcListSagas;
