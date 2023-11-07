import {
  all, call, put, takeEvery, fork
} from 'redux-saga/effects';
import API from '../../../../config/axiosConfig';
import * as URL from '../../../../lib/apiUrls';
import { UPLOAD_FILE } from './constants';
import {
  uploadFileRequest,
  uploadFileSuccess,
  uploadFileError
} from './actions';
import { getAuthToken } from '../../../../utils/helpers';

export function* uploadFileAsync(action) {
  const headers = {
    'x-auth-token': getAuthToken(),
    'Content-Type': 'application/json'
  };
  try {
    yield put(uploadFileRequest());
    const data = yield call(() => {return API.post(URL.FILE_UPLOAD, action.payload, { headers })}); 
    yield put(uploadFileSuccess(data));
  } catch (error) {
    yield put(uploadFileError(error));
  }
}

function* uploadFileRootSaga() {
  yield all([
    yield takeEvery(UPLOAD_FILE, uploadFileAsync)
  ]);
}

const uploadFileSagas = [
  fork(uploadFileRootSaga),
];

export default uploadFileSagas;
