/*
 *
 * UserSettings reducer
 *
 */

import { fromJS } from "immutable";
import {
  DEFAULT_ACTION,
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_ERROR
} from "./constants";

export const initialState = fromJS({});

function userSettingsReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case FETCH_USERS_REQUEST:
      return Object.assign({}, state, {
        loading: true
      });
    case FETCH_USERS_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        users: action.users
      });
    case FETCH_USERS_ERROR:
      return Object.assign({}, state, {
        loading: false,
        error: true
      });
    default:
      return state;
  }
}

export default userSettingsReducer;
