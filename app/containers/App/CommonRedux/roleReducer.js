import { fromJS } from 'immutable';
import {
  FETCH_ROLE_REQUEST,
  FETCH_ROLE_SUCCESS,
  FETCH_ROLE_ERROR
} from './constants';

export const initialState = fromJS({});

function roleReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_ROLE_REQUEST:
      return Object.assign({}, state, {
        loading: true
      });
    case FETCH_ROLE_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        roles: action.roles,
        count: action.count
      });
    case FETCH_ROLE_ERROR:
      return Object.assign({}, state, {
        loading: false,
        error: true
      });
    default:
      return state;
  }
}

export default roleReducer;
