import { fromJS } from 'immutable';
import {
  FETCH_HEALTH_FACILITIES_REQUEST,
  FETCH_HEALTH_FACILITIES_SUCCESS,
  FETCH_HEALTH_FACILITIES_ERROR,
} from './constants';

export const initialState = fromJS({});

function healthFacilityReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_HEALTH_FACILITIES_REQUEST:
      return Object.assign({}, state, {
        loading: true
      });
    case FETCH_HEALTH_FACILITIES_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        healthFacilities: action.healthFacilities,
        count: action.count
      });
    case FETCH_HEALTH_FACILITIES_ERROR:
      return Object.assign({}, state, {
        loading: false,
        error: true
      });
    default:
      return state;
  }
}

export default healthFacilityReducer;
