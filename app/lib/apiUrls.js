const { BASE_URL } = process.env;
const { ASSET_URL } = process.env;

module.exports = {
  ASSET_URL,
  GET_CITIZEN: `${BASE_URL}/citizens/getCitizen`,
  GET_CITIZEN_IMAGE: `${BASE_URL}/citizens/base64ToImage`,
  HEALTH_FACILITIES: `${BASE_URL}/facility-registry`,
  HEALTH_FACILITIES_LIST: `${BASE_URL}/facility-registry/activeList`,
  SERVICE: `${BASE_URL}/service`,
  SERVICE_LIST: `${BASE_URL}/service/activeList`,
  PACKAGE: `${BASE_URL}/package`,
  PACKAGE_LIST: `${BASE_URL}/service/activeList`,
  ROlES: `${BASE_URL}/roles`,
  ROLES_LIST: `${BASE_URL}/roles/activeList`,
  USERS: `${BASE_URL}/users`,
  GET_USER: `${BASE_URL}/users/`,
  AUDIT_LOGS: `${BASE_URL}/audit-log`,
  FACILITY_TYPE: `${BASE_URL}/facility-type`,
  FACILITY_TC: `${BASE_URL}/meta-data`,
  CREATE_ADMIN: `${BASE_URL}/admin`,
  EMAIL_EXIST: `${BASE_URL}/admin/email`,
  USER_PROFILE: `${BASE_URL}/users/profile`,
  DELETE_USERS: `${BASE_URL}/users/deleteByIds`,
  EMBASSIES: `${BASE_URL}/embassies`,
  EMBASSIES_LIST: `${BASE_URL}/embassies/activeList`,
  PROVINCES: `${BASE_URL}/provinces`,
  DISTRICTS: `${BASE_URL}/districts`,
  SECTORS: `${BASE_URL}/sectors`,
  CELLS: `${BASE_URL}/cells`,
  VILLAGES: `${BASE_URL}/villages`,
  PROVINCES_LIST: `${BASE_URL}/provinces/activeList`,
  DISTRICTS_LIST: `${BASE_URL}/districts/activeList`,
  SECTORS_LIST: `${BASE_URL}/sectors/activeList`,
  CELLS_LIST: `${BASE_URL}/cells/activeList`,
  VILLAGES_LIST: `${BASE_URL}/villages/activeList`,
  HEALTHFACILITY_COUNT: `${BASE_URL}/facility-registry`,
  LOGIN: `${BASE_URL}/admin/login`,
  // LOG_OUT_USER: `${BASE_URL}/jwt-blacklist`,
  UPLOAD: `${BASE_URL}/facility-registry/upload`,
  FILE_UPLOAD: `${BASE_URL}/facility-registry/upload`,
  FORGOT_PASSWORD: `${BASE_URL}/users/changePassword`,
  GET_OTP: `${BASE_URL}/users/forgotPassword`,
  RESET_PASSWORD: `${BASE_URL}/users/updatePassword`,
  GET_PACKAGES_BY_CATEGORY:`${BASE_URL}/package`,
  SERVICES:`${BASE_URL}/service`,
};