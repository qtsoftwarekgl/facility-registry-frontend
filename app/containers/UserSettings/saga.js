import { call, put, takeLatest } from 'redux-saga/effects';
import { FETCH_USERS } from './constants';
import {
  fetchUsersRequest,
  fetchUsersSuccess,
  fetchUsersError
} from './actions';


const sampleData = [
  {
    _id: 1, createdAt: '2020-05-22T14:07:34.208Z', name: 'NYIRAROMBA', role: 'cr', ministry: 'MINALOC', facility_area: 'cell', facility_type: "community"
  },
  {
    _id: 2, createdAt: '2020-05-23T14:05:34.208Z', name: 'NIKUZE', role: 'notifier', ministry: 'MOH', facility_area: 'healthFacility', facility_type: "healthFacility"
  }
];
export function* fetchUsersAsync() {
  try {
    yield put(fetchUsersRequest());
    // const data = yield call(() => {
    //   return fetch('http://172.16.40.26:3003/birth/api/v1/birthApplications?status=unapproved', {
    //     method: 'POST',
    //     headers: {
    //       "Authorization": "Bearer ",
    //       "Content-Type":"application/json"
    //     }
    //   }).then(res => res.json());
    // })
    yield put(fetchUsersSuccess(sampleData));
  } catch(error) {
    yield put(fetchUsersError());
  }
}
// Individual exports for testing
export default function* userSettingsSaga() {
  yield takeLatest(FETCH_USERS, fetchUsersAsync);
}
