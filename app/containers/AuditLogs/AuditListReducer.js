import { fromJS } from 'immutable';
import {
  FETCH_AUDIT_LIST_REQUEST,
  FETCH_AUDIT_LIST_SUCCESS,
  FETCH_AUDIT_LIST_ERROR
} from './constants';

export const initialState = fromJS({});

function auditListReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_AUDIT_LIST_REQUEST:
      return Object.assign({}, state, {
        loading: true
      });
    case FETCH_AUDIT_LIST_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        auditList: action.auditList,
        count: action.count
      });
    case FETCH_AUDIT_LIST_ERROR:
      return Object.assign({}, state, {
        loading: false,
        error: true
      });
    default:
      return state;
  }
}

export default auditListReducer;
