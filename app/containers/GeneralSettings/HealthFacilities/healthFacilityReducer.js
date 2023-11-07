import { fromJS } from 'immutable';
import {
  FETCH_HEALTH_FACILITIES_REQUEST,
  FETCH_HEALTH_FACILITIES_SUCCESS,
  FETCH_HEALTH_FACILITIES_ERROR,
  CREATE_HEALTH_FACILITY_SUCCESS,
  FACILITY_DELETE_SUCCESS,
  FACILITY_UPDATE_SUCCESS,
  FACILITY_CLEAR_STORE,
  FACILITY_UPDATE_ERROR,
  CREATE_HEALTH_FACILITY_ERROR,
  FACILITY_ASSET_REQUEST,
  FACILITY_ASSET_SUCCESS,
  FACILITY_ASSET_ERROR
} from './constants';

export const initialState = fromJS({});

function healthFacilityReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_HEALTH_FACILITIES_REQUEST:
      return Object.assign({}, state, {
        loading: true,
        facilityDeleteStatus: '',
        facilityCreatedStatus: '',
        facilityUpdateStatus: '',
        errorMessage: ''
      });
    case FETCH_HEALTH_FACILITIES_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        healthFacilities: action.healthFacilities,
        count: action.count
      });
    case CREATE_HEALTH_FACILITY_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        facilityCreatedStatus: action.facilityCreatedStatus,
        errorMessage: action.errorMessage
      });
    case CREATE_HEALTH_FACILITY_ERROR:
      return Object.assign({}, state, {
        loading: false,
        facilityCreatedStatus: action.facilityCreatedStatus,
        errorMessage: action.errorMessage
      });
    case FACILITY_UPDATE_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        facilityUpdateStatus: action.facilityUpdateStatus,
        errorMessage: action.errorMessage
      });
    case FACILITY_UPDATE_ERROR:
      return Object.assign({}, state, {
        loading: false,
        facilityUpdateStatus: action.facilityUpdateStatus,
        errorMessage: action.errorMessage
      });
    case FACILITY_DELETE_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        facilityDeleteStatus: action.facilityDeleteStatus
      });
    case FETCH_HEALTH_FACILITIES_ERROR:
      return Object.assign({}, state, {
        loading: false,
        error: true
      });
    case FACILITY_CLEAR_STORE:
      return Object.assign({}, state, {
        loading: false,
        facilityUpdateStatus: '',
        facilityCreatedStatus: '',
        facilityAssetStatus: '',
        errorMessage: ''
      });
    case FACILITY_ASSET_REQUEST:
      return Object.assign({}, state, {
        loading: true,
        facilityAssetStatus: '',
        errorMessage: ''
      });
    case FACILITY_ASSET_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        facilityAssetStatus: action.facilityAssetStatus,
        errorMessage: action.errorMessage
      });
    case FACILITY_ASSET_ERROR:
      return Object.assign({}, state, {
        loading: false,
        facilityAssetStatus: action.facilityAssetStatus,
        errorMessage: action.errorMessage
      });
    default:
      return state;
  }
}

export default healthFacilityReducer;
