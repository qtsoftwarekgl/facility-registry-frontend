import { fromJS } from 'immutable';
import {
  FETCH_CITIZEN_REQUEST,
  FETCH_CITIZEN_SUCCESS,
  FETCH_CITIZEN_ERROR,
  CITIZEN_STORE_CLEAR
} from './constants';

export const initialState = fromJS({});

function citizenReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_CITIZEN_REQUEST:
      return Object.assign({}, state, {
        loading: true
      });
    case FETCH_CITIZEN_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        citizen: action.citizen,
        citizenMessage: action.citizenMessage
      });
    case FETCH_CITIZEN_ERROR:
      return Object.assign({}, state, {
        loading: false,
        error: true
      });
    case CITIZEN_STORE_CLEAR:
      return Object.assign({}, state, {
        loading: false,
        citizen: null,
        citizenMessage: ''
      });
    default:
      return state;
  }
}

export default citizenReducer;
