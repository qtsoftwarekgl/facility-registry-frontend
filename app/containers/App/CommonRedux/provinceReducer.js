import { fromJS } from 'immutable';
import {
  FETCH_PROVINCES_REQUEST,
  FETCH_PROVINCES_SUCCESS,
  FETCH_PROVINCES_ERROR
} from './constants';

export const initialState = fromJS({});

function provinceReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_PROVINCES_REQUEST:
      return Object.assign({}, state, {
        loading: true
      });
    case FETCH_PROVINCES_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        provinces: action.provinces
      });
    case FETCH_PROVINCES_ERROR:
      return Object.assign({}, state, {
        loading: false,
        error: true
      });
    default:
      return state;
  }
}

export default provinceReducer;
