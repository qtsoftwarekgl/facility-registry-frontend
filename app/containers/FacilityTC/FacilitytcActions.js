import actions from 'redux-form/lib/actions';
import moment from 'moment';
import {
  FETCH_FACILITY_TC_LIST,
  FETCH_FACILITY_TC_REQUEST,
  FETCH_FACILITY_TC_SUCCESS,
  FETCH_FACILITY_TC_ERROR,
  FETCH_GET_PACKAGE_BY_CATEGOTY_LIST,
  FETCH_GET_PACKAGE_BY_CATEGOTY_REQUEST,
  FETCH_GET_PACKAGE_BY_CATEGOTY_SUCCESS,
  FETCH_GET_PACKAGE_BY_CATEGOTY_ERROR
} from './constants';


export function fetchFacilitytcList(params) {
  return {
    type: FETCH_FACILITY_TC_LIST,
    payload: {
      page:params.page || 1,
      limit:params.limit || 20,
      userName:params.userName || '',
      entity:params.entity || '',
      act:params.action !== 'All' ? params.action : '',
      ip:params.ip || '',
      startDate:params.fromDate ? moment(params.fromDate).format("YYYY-MM-DD") : '',
      endDate:params.toDate ? moment(params.toDate).format("YYYY-MM-DD") : '',
      facilityCode: params.facilityCode || '',
    }
  };
}


export function fetchFacilitytcListRequest() {
  return {
    type: FETCH_FACILITY_TC_REQUEST
  };
}

export function fetchFacilitytcListtSuccess(response) {
  return {
    type: FETCH_FACILITY_TC_SUCCESS,
    facilitytcList: response ? response.data : [],
    count: response ? response.count : 0
  };
}


export function fetchFacilitytcListtError() {
  return {
    type: FETCH_FACILITY_TC_ERROR
  };
}

export function fetchPackagesByCategoryList(params) {
  return {
    type: FETCH_GET_PACKAGE_BY_CATEGOTY_LIST,
    payload: {
      categoryId: params.categoryId,
      status: params.status
    }
  };
}


export function fetchPackagesByCategoryRequest() {
  return {
    type: FETCH_GET_PACKAGE_BY_CATEGOTY_REQUEST
  };
}

export function fetchPackagesByCategorySuccess(response) {
  return {
    type: FETCH_GET_PACKAGE_BY_CATEGOTY_SUCCESS,
    getPackagesByCategoryList: response ? response.data : [],
  };
}


export function fetchPackagesByCategoryError() {
  return {
    type: FETCH_GET_PACKAGE_BY_CATEGOTY_ERROR
  };
}
