import { fromJS } from 'immutable';
import {
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_ERROR,
  RESET_PASSWORD_CLEAR
} from './constants';

export const initialState = fromJS({});

function resetPasswordReducer(state = initialState, action) {
  switch (action.type) {
    case RESET_PASSWORD_REQUEST:
      return Object.assign({}, state, {
        loading: true
      });
    case RESET_PASSWORD_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        passwordUpdated: action.passwordUpdated,
        message: action.message
      });
    case RESET_PASSWORD_ERROR:
      return Object.assign({}, state, {
        loading: false,
        error: true
      });
    case RESET_PASSWORD_CLEAR:
      return Object.assign({}, state, {
        loading: false,
        passwordUpdated: '',
        message: ''
      });
    default:
      return state;
  }
}

export default resetPasswordReducer;
