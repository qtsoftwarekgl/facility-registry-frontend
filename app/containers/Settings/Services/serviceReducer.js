import { fromJS } from 'immutable';
import {
  FETCH_SERVICE_REQUEST,
  FETCH_SERVICE_SUCCESS,
  FETCH_SERVICE_ERROR,
  CREATE_SERVICE_SUCCESS,
  SERVICE_DELETE_SUCCESS,
  SERVICE_UPDATE_SUCCESS,
  SERVICE_CLEAR_STORE,
  SERVICE_UPDATE_ERROR,
  CREATE_SERVICE_ERROR,
  STATUS_UPDATE_SUCCESS,
  STATUS_UPDATE_ERROR
} from './constants';

export const initialState = fromJS({});

function serviceReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_SERVICE_REQUEST:
      return Object.assign({}, state, {
        loading: true,
        serviceDeleteStatus: '',
        serviceCreatedStatus: '',
        serviceUpdateStatus: '',
        statusUpdateStatus: '',
        errorMessage: ''
      });
    case FETCH_SERVICE_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        serviceData: action.serviceData,
        count: action.count
      });
      case FETCH_SERVICE_ERROR:
        return Object.assign({}, state, {
          loading: false,
          errorMessage: action.errorMessage,
        });
    case CREATE_SERVICE_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        serviceCreatedStatus: action.serviceCreatedStatus,
        errorMessage: action.errorMessage
      });
    case CREATE_SERVICE_ERROR:
      return Object.assign({}, state, {
        loading: false,
        serviceCreatedStatus: action.serviceCreatedStatus,
        errorMessage: action.errorMessage
      });
    case SERVICE_UPDATE_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        serviceUpdateStatus: action.serviceUpdateStatus,
        errorMessage: action.errorMessage
      });
    case SERVICE_UPDATE_ERROR:
      return Object.assign({}, state, {
        loading: false,
        serviceUpdateStatus: action.serviceUpdateStatus,
        errorMessage: action.errorMessage
      });
    case STATUS_UPDATE_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        statusUpdateStatus: action.statusUpdateStatus,
        errorMessage: action.errorMessage
      });
    case STATUS_UPDATE_ERROR:
      return Object.assign({}, state, {
        loading: false,
        statusUpdateStatus: action.statusUpdateStatus,
        errorMessage: action.errorMessage
      });
    case SERVICE_DELETE_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        serviceDeleteStatus: action.serviceDeleteStatus
      });
    case FETCH_SERVICE_ERROR:
      return Object.assign({}, state, {
        loading: false,
        error: true
      });
    case SERVICE_CLEAR_STORE:
      return Object.assign({}, state, {
        loading: false,
        serviceUpdateStatus: '',
        serviceCreatedStatus: '',
        errorMessage: ''
      });
    default:
      return state;
  }
}

export default serviceReducer;
