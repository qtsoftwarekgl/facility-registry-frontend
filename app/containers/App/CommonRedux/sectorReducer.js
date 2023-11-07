import { fromJS } from 'immutable';
import {
  FETCH_SECTORS_REQUEST,
  FETCH_SECTORS_SUCCESS,
  FETCH_SECTORS_ERROR
} from './constants';

export const initialState = fromJS({});

function sectorReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_SECTORS_REQUEST:
      return Object.assign({}, state, {
        loading: true
      });
    case FETCH_SECTORS_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        sectors: action.sectors
      });
    case FETCH_SECTORS_ERROR:
      return Object.assign({}, state, {
        loading: false,
        error: true
      });
    default:
      return state;
  }
}

export default sectorReducer;
