import { fromJS } from 'immutable';
import {
  FETCH_CELLS_REQUEST,
  FETCH_CELLS_SUCCESS,
  FETCH_CELLS_ERROR
} from './constants';

export const initialState = fromJS({});

function cellReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_CELLS_REQUEST:
      return Object.assign({}, state, {
        loading: true
      });
    case FETCH_CELLS_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        cells: action.cells
      });
    case FETCH_CELLS_ERROR:
      return Object.assign({}, state, {
        loading: false,
        error: true
      });
    default:
      return state;
  }
}

export default cellReducer;
