import { fromJS } from 'immutable';
import {
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  UPDATE_USER_CLEAR
} from './constants';

export const initialState = fromJS({});

function updateUserReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_USER_REQUEST:
      return Object.assign({}, state, {
        loading: true
      });
    case UPDATE_USER_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        userUpdated: action.userUpdated,
        updateMessage: action.updateMessage,
        errorMessage: action.errorMessage
      });
    case UPDATE_USER_ERROR:
      return Object.assign({}, state, {
        loading: false,
        error: true,
        updateMessage: action.updateMessage,
        errorMessage: action.errorMessage
      });
    case UPDATE_USER_CLEAR:
      return Object.assign({}, state, {
        loading: false,
        error: true,
        userUpdated: '',
        errorMessage: ''
      });
    default:
      return state;
  }
}

export default updateUserReducer;
