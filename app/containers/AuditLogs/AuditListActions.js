import actions from 'redux-form/lib/actions';
import moment from 'moment';
import {
  FETCH_AUDIT_LIST,
  FETCH_AUDIT_LIST_REQUEST,
  FETCH_AUDIT_LIST_SUCCESS,
  FETCH_AUDIT_LIST_ERROR,
} from './constants';


export function fetchAuditList(params) {
  return {
    type: FETCH_AUDIT_LIST,
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

export function fetchAuditListRequest() {
  return {
    type: FETCH_AUDIT_LIST_REQUEST
  };
}

export function fetchAuditListSuccess(response) {
  return {
    type: FETCH_AUDIT_LIST_SUCCESS,
    auditList: response ? response.data : [],
    count: response ? response.count : 0
  };
}

export function fetchAuditListError() {
  return {
    type: FETCH_AUDIT_LIST_ERROR
  };
}