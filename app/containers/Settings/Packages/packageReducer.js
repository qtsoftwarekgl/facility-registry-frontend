import { fromJS } from 'immutable';
import {
  FETCH_PACKAGE_REQUEST,
  FETCH_PACKAGE_SUCCESS,
  FETCH_PACKAGE_ERROR,
  CREATE_PACKAGE_SUCCESS,
  PACKAGE_DELETE_SUCCESS,
  PACKAGE_UPDATE_SUCCESS,
  PACKAGE_CLEAR_STORE,
  PACKAGE_UPDATE_ERROR,
  CREATE_PACKAGE_ERROR,
  STATUS_UPDATE_PACKAGE_SUCCESS,
  STATUS_UPDATE_PACKAGE_ERROR
} from './constants';

export const initialState = fromJS({});

function packageReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_PACKAGE_REQUEST:
      return Object.assign({}, state, {
        loading: true,
        packageDeleteStatus: '',
        packageCreatedStatus: '',
        packageUpdateStatus: '',
        statusUpdateStatus: '',
        errorMessage: ''
      });
    case FETCH_PACKAGE_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        packageData: action.packageData,
        count: action.count
      });
      case FETCH_PACKAGE_ERROR:
        return Object.assign({}, state, {
          loading: false,
          errorMessage: action.errorMessage,
        });
    case CREATE_PACKAGE_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        packageCreatedStatus: action.packageCreatedStatus,
        errorMessage: action.errorMessage
      });
    case CREATE_PACKAGE_ERROR:
      return Object.assign({}, state, {
        loading: false,
        packageCreatedStatus: action.packageCreatedStatus,
        errorMessage: action.errorMessage
      });
    case PACKAGE_UPDATE_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        packageUpdateStatus: action.packageUpdateStatus,
        errorMessage: action.errorMessage
      });
    case PACKAGE_UPDATE_ERROR:
      return Object.assign({}, state, {
        loading: false,
        packageUpdateStatus: action.packageUpdateStatus,
        errorMessage: action.errorMessage
      });
    case STATUS_UPDATE_PACKAGE_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        statusUpdateStatus: action.statusUpdateStatus,
        errorMessage: action.errorMessage
      });
    case STATUS_UPDATE_PACKAGE_ERROR:
      return Object.assign({}, state, {
        loading: false,
        statusUpdateStatus: action.statusUpdateStatus,
        errorMessage: action.errorMessage
      });
    case PACKAGE_DELETE_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        packageDeleteStatus: action.packageDeleteStatus
      });
    case FETCH_PACKAGE_ERROR:
      return Object.assign({}, state, {
        loading: false,
        error: true
      });
    case PACKAGE_CLEAR_STORE:
      return Object.assign({}, state, {
        loading: false,
        packageUpdateStatus: '',
        packageCreatedStatus: '',
        errorMessage: ''
      });
    default:
      return state;
  }
}

export default packageReducer;
