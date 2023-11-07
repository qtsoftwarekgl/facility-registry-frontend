import { fromJS } from 'immutable';
import {
  UPLOAD_FILE_REQUEST,
  UPLOAD_FILE_SUCCESS,
  UPLOAD_FILE_ERROR,
  UPLOAD_FILE_CLEAR
} from './constants';

export const initialState = fromJS({});

function uploadFileReducer(state = initialState, action) {
  switch (action.type) {
    case UPLOAD_FILE_REQUEST:
      return Object.assign({}, state, {
        loading: true
      });
    case UPLOAD_FILE_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        fileUploaded: action.fileUploaded,
        message: action.message
      });
    case UPLOAD_FILE_ERROR:
      return Object.assign({}, state, {
        loading: false,
        error: true,
        fileUploaded: action.fileUploaded,
        fileUploadErrorData: action.fileUploadErrorData,
        fileUploadErrorMessage: action.fileUploadErrorMessage
      });
    case UPLOAD_FILE_CLEAR:
      return Object.assign({}, state, {
        fileUploaded: '',
        filePath: '',
        message: ''
      });
    default:
      return state;
  }
}

export default uploadFileReducer;
