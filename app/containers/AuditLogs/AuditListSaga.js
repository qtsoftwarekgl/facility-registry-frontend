import { all, call, put, takeEvery, fork } from "redux-saga/effects";
import { FETCH_AUDIT_LIST } from "./constants";
import API from "../../config/axiosConfig";
import * as URL from "../../lib/apiUrls";
import {
  fetchAuditListRequest,
  fetchAuditListSuccess,
  fetchAuditListError,
} from "./AuditListActions";

export function* fetchAuditListAsync(action) {
  const { page, limit, userName, entity, act, ip, startDate, endDate, facilityCode } = action.payload;

  let url = `${URL.AUDIT_LOGS}?page=${page}&limit=${limit}`;
  if (userName) {
    url = `${url}&user=${userName}`;
  }
  if (entity) {
    url = `${url}&entity=${entity}`;
  }
  if (act) {
    url = `${url}&action=${act}`;
  }
  if (ip) {
    url = `${url}&ip=${ip}`;
  }
  if (startDate) {
    url = `${url}&startDate=${startDate}`;
  }
  if (endDate) {
    url = `${url}&endDate=${endDate}`;
  }
  if (facilityCode) {
    url = `${url}&facilityCode=${facilityCode}`;
  }
  try {
    yield put(fetchAuditListRequest());
    const data = yield call(() => API.get(url));
    yield put(fetchAuditListSuccess(data));
  } catch (error) {
    yield put(fetchAuditListError());
  }
}

function* auditListRootSaga() {
  yield all([yield takeEvery(FETCH_AUDIT_LIST, fetchAuditListAsync)]);
}

const auditListSagas = [fork(auditListRootSaga)];

export default auditListSagas;
