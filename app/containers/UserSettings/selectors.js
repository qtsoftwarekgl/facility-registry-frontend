import { createSelector } from "reselect";
import { initialState } from "./reducer";

/**
 * Direct selector to the userSettings state domain
 */

const selectUserSettingsDomain = state =>
  state.get("userSettings", initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by UserSettings
 */

const makeSelectUserSettings = () =>
  createSelector(
    selectUserSettingsDomain,
    substate => substate.users()
  );

export default makeSelectUserSettings;
export { selectUserSettingsDomain };
