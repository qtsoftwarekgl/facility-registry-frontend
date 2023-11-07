import { fromJS } from 'immutable';
import {
  FETCH_FACILITY_TC_REQUEST,
  FETCH_FACILITY_TC_SUCCESS,
  FETCH_FACILITY_TC_ERROR,
  FETCH_GET_PACKAGE_BY_CATEGOTY_REQUEST,
  FETCH_GET_PACKAGE_BY_CATEGOTY_SUCCESS,
  FETCH_GET_PACKAGE_BY_CATEGOTY_ERROR
} from './constants';

export const initialState = fromJS({});

function facilitytcReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_FACILITY_TC_REQUEST:
      return Object.assign({}, state, {
        loading: true
      });
      case FETCH_FACILITY_TC_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        facilitytcList: action.facilitytcList,
        count: action.count
      });
    case FETCH_FACILITY_TC_ERROR:
      return Object.assign({}, state, {
        loading: false,
        error: true
      });
    case FETCH_GET_PACKAGE_BY_CATEGOTY_REQUEST:
      return Object.assign({}, state, {
        loading: true
      });
      case FETCH_GET_PACKAGE_BY_CATEGOTY_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        getPAckagesByCategoryList: action.getPackagesByCategoryList
      });
    case FETCH_GET_PACKAGE_BY_CATEGOTY_ERROR:
      return Object.assign({}, state, {
        loading: false,
        error: true
      });
    default:
      return state;
  }
}

export default facilitytcReducer;
