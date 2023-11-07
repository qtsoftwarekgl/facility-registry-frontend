import {
  UPLOAD_FILE,
  UPLOAD_FILE_REQUEST,
  UPLOAD_FILE_SUCCESS,
  UPLOAD_FILE_ERROR,
  UPLOAD_FILE_CLEAR
} from './constants';

export function uploadFile(data) {
  return {
    type: UPLOAD_FILE,
    payload: data
  };
}

export function uploadFileRequest() {
  return {
    type: UPLOAD_FILE_REQUEST
  };
}

export function uploadFileSuccess(response) {
  return {
    type: UPLOAD_FILE_SUCCESS,
    fileUploaded: response ? response.status : '',
    message: response ? response.message : ''
  };
}

export function uploadFileError(error) {
  let res = error.response.data
  let message = '';
  if (res.status === 'error') {
    message = res.message;
  }
  return {
    type: UPLOAD_FILE_ERROR,
    fileUploaded: res ? res.status : '',
    fileUploadErrorData : res.data ? res.data : '',
    fileUploadErrorMessage: message ? message : ''
  };
}

export function uploadFileClear() {
  return {
    type: UPLOAD_FILE_CLEAR
  };
}
