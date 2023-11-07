import { fromJS } from 'immutable';
import {
  FETCH_EMBASSY_REQUEST,
  FETCH_EMBASSY_SUCCESS,
  FETCH_EMBASSY_ERROR
} from './constants';

export const initialState = fromJS({});

function embassyReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_EMBASSY_REQUEST:
      return Object.assign({}, state, {
        loading: true
      });
    case FETCH_EMBASSY_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        embassies: action.embassies
      });
    case FETCH_EMBASSY_ERROR:
      return Object.assign({}, state, {
        loading: false,
        error: true
      });
    default:
      return state;
  }
}

export default embassyReducer;
