import {
  call, fork, put, takeEvery, all
} from 'redux-saga/effects';
import history from '../../utils/history';
import {
  LOGOUT_REQUEST
} from '../constants/authConstants';
import {
  logoutSuccess,
  logoutFailure
} from '../actions/authActions';
// import * as URL from '../../lib/apiUrls';
// import API from '../../config/axiosConfig';

function* logoutSaga() {
  // const url = URL.LOG_OUT_USER;
  try {
    // const data = yield call(() => API.post(url));
    yield put(logoutSuccess());
    // Redirect to home
    yield history.replace('/login');
  } catch (error) {
    yield put(logoutFailure(error));
  }
}


//= ====================================
//  WATCHERS
//-------------------------------------

function* loginRootSaga() {
  yield all([
    takeEvery(LOGOUT_REQUEST, logoutSaga)
  ]);
}

const authSagas = [
  fork(loginRootSaga),
];

export default authSagas;
