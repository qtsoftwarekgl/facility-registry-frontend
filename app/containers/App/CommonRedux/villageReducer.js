import { fromJS } from 'immutable';
import {
  FETCH_VILLAGES_REQUEST,
  FETCH_VILLAGES_SUCCESS,
  FETCH_VILLAGES_ERROR,
  FETCH_ACTIVE_VILLAGES_REQUEST,
  FETCH_ACTIVE_VILLAGES_SUCCESS,
  FETCH_ACTIVE_VILLAGES_ERROR,
  FETCH_ACTIVE_VILLAGES_CLEAR
} from './constants';

export const initialState = fromJS({});

function villageReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_VILLAGES_REQUEST:
      return Object.assign({}, state, {
        loading: true
      });
    case FETCH_VILLAGES_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        villages: action.villages
      });
    case FETCH_VILLAGES_ERROR:
      return Object.assign({}, state, {
        loading: false,
        error: true
      });
    default:
      return state;
  }
}

export default villageReducer;
