import { fromJS } from 'immutable';
import {
  FETCH_DISTRICT_REQUEST,
  FETCH_DISTRICT_SUCCESS,
  FETCH_DISTRICT_ERROR
} from './constants';

export const initialState = fromJS({});

function districtReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_DISTRICT_REQUEST:
      return Object.assign({}, state, {
        loading: true
      });
    case FETCH_DISTRICT_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        districts: action.districts
      });
    case FETCH_DISTRICT_ERROR:
      return Object.assign({}, state, {
        loading: false,
        error: true
      });
    default:
      return state;
  }
}

export default districtReducer;
