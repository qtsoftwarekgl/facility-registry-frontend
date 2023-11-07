/**
 * Combine all reducers in this file and export the combined reducers.
 */
import { reducer as form } from 'redux-form/immutable';
import { combineReducers } from 'redux-immutable';
import { connectRouter } from 'connected-react-router/immutable';
import history from 'utils/history';

// Global Reducers
import languageProviderReducer from 'containers/LanguageProvider/reducer';
import authReducer from './modules/authReducer';
import uiReducer from './modules/uiReducer';
import initval from './modules/initFormReducer';
import auditListReducer from '../containers/AuditLogs/AuditListReducer';
import facilitytcReducer from '../containers/FacilityTC/FacilitytcReducer';
import adminAuthReducer from '../containers/Login/authReducer';
import roleReducer from '../containers/App/CommonRedux/roleReducer';
import healthFacilityReducer from '../containers/App/CommonRedux/healthFacilityReducer';
import embassyReducer from '../containers/App/CommonRedux/embassyReducer';
import citizenReducer from '../containers/App/CommonRedux/citizenReducer';
import provinceReducer from '../containers/App/CommonRedux/provinceReducer';
import districtReducer from '../containers/App/CommonRedux/districtReducer';
import sectorReducer from '../containers/App/CommonRedux/sectorReducer';
import cellReducer from '../containers/App/CommonRedux/cellReducer';
import villageReducer from '../containers/App/CommonRedux/villageReducer';
import userReducer from '../containers/UserSettings/CreateUser/userReducer';
import userListReducer from '../containers/UserSettings/UserList/userListReducer';
import updateUserReducer from '../containers/UserSettings/UserList/updateUserReducer';
import healthFacilityCrudReducer from '../containers/GeneralSettings/HealthFacilities/healthFacilityReducer';
import resetPasswordReducer from '../containers/App/CommonRedux/resetPasswordReducer';
import serviceReducer from '../containers/Settings/Services/serviceReducer'
import packageReducer from '../containers/Settings/Packages/packageReducer'
import uploadFileReducer from '../containers/App/CommonRedux/upload/reducer'


/**
 * Creates the main reducer with the dynamically injected ones
 */
export default function createReducer(injectedReducers = {}) {
  const rootReducer = combineReducers({
    form,
    ui: uiReducer,
    initval,
    authReducer,
    auditListReducer,
    facilitytcReducer,
    adminAuthReducer,
    roleReducer,
    embassyReducer,
    citizenReducer,
    provinceReducer,
    districtReducer,
    sectorReducer,
    cellReducer,
    villageReducer,
    userReducer,
    userListReducer,
    updateUserReducer,
    language: languageProviderReducer,
    healthFacilityReducer,
    healthFacilityCrudReducer,
    serviceReducer,
    packageReducer,
    uploadFileReducer,
    resetPasswordReducer,
    router: connectRouter(history),
    ...injectedReducers,
  });

  // Wrap the root reducer and return a new root reducer with router state
  const mergeWithRouterState = connectRouter(history);
  return mergeWithRouterState(rootReducer);
}
