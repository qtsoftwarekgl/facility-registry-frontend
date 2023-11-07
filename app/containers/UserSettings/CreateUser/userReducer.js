import { fromJS } from 'immutable';
import {
  CREATE_NEW_USER_REQUEST,
  CREATE_NEW_USER_SUCCESS,
  CREATE_NEW_USER_ERROR,
  CREATE_NEW_USER_CLEAR,
  EDIT_USER_REQUEST,
  EDIT_USER_SUCCESS,
  EDIT_USER_ERROR,
  EDIT_USER_CLEAR,
  GET_USER,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_ERROR,
} from './constants';

export const initialState = fromJS({});

function userReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_NEW_USER_REQUEST:
      return Object.assign({}, state, {
        loading: true
      });
    case CREATE_NEW_USER_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        userCreated: action.userCreated,
        message: action.message
      });
    case CREATE_NEW_USER_ERROR:
      return Object.assign({}, state, {
        loading: false,
        error: true
      });
    case EDIT_USER_REQUEST:
      return Object.assign({}, state, {
        loading: true
      });
    case EDIT_USER_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        userUpdated: action.userUpdated,
        message: action.message
      });
    case EDIT_USER_ERROR:
      return Object.assign({}, state, {
        loading: false,
        error: true
      });
    case CREATE_NEW_USER_CLEAR:
      return Object.assign({}, state, {
        userCreated: '',
        message: ''
      });
    case EDIT_USER_CLEAR:
        return Object.assign({}, state, {
          userUpdated: '',
          message: ''
        });
    case GET_USER:
      return Object.assign({}, state, {
        loading: true
      });
    case GET_USER_REQUEST:
      return Object.assign({}, state, {
        loading: true
      });
    case GET_USER_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        resultData: action.resultData
      });
    case GET_USER_ERROR:
      return Object.assign({}, state, {
        loading: false,
        error: true
      });
    default:
      return state;
  }
}

export default userReducer;
