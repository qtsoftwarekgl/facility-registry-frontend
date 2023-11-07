import jwt_decode from 'jwt-decode'; // eslint-disable-line
import _ from 'lodash';
import { SESSION } from '../lib/constants';
import countriesList from '../lib/countries';

export const unsetLocalStorage = () => (localStorage.clear());

export const getLocalStorage = (key) => {
  const getStorage = localStorage.getItem(key);
  try {
    return getStorage ? atob(getStorage) : false;
  } catch (e) {
    return false;
  }
};

export const getAuthToken = () => localStorage.getItem(SESSION.TOKEN) || '';

export const getUserData = () => {
  if (getAuthToken()) {
    const userDetail = jwt_decode(getAuthToken());// eslint-disable-line
    return userDetail;
  }
  return null;
};

export const isPasswordResetRequired = (userProfileData) => {
  if (userProfileData.isRequiredToResetPassword) {
    return true;
  }
  return false;
};

export const handleSessionExpiration = (error) => {
  if (error && error.response && error.response.data) {
    const respData = error.response.data;
    if (
      respData.status === SESSION.EXPIRED
      || respData.code === SESSION.EXPIRED_ERROR_CODE
      || error.response.status === 401
    ) {
      unsetLocalStorage();
      window.location.href = '/login';
    }
  }
};

export const getRoleName = (role) => {
  switch (role) {
    case 'NOTIFIER': return 'Notifier';
    case 'CR': return 'Registrar';
    case 'MINISTRY_ADMIN': return 'Administrator';
    case 'SECONDARY_ADMIN': return 'Secondary Administrator';
    case 'SUPER_ADMIN': return 'Super Administrator';
    case 'LAUNCHER': return 'Launcher';
    case 'ADMIN': return 'Admin';
    case 'VIEWER': return 'Viewer';
    default: return 'N/A';
  }
};

export const docInputValildation = (e, docType) => {
  if (e.keyCode === 17 || e.keyCode === 88 || e.keyCode === 67 || e.keyCode === 86 || e.keyCode === 8 || (e.keyCode > 95 && e.keyCode < 106)) {
    return true;
  }
  if (docType === 'NID' || docType === 'NIN') {
    if ((e.keyCode > 47 && e.keyCode < 58) || e.keyCode < 20 || (docType === 'NIN' && e.keyCode === 189)) {
      return true;
    }
    e.preventDefault();
  } else if (docType === 'PASSPORT') {
    if ((e.keyCode > 47 && e.keyCode < 91) || e.keyCode < 20) {
      return true;
    }
    e.preventDefault();
  }
  return true;
};

export const documentNumberValidation = (documentType, input) => {
  let isValid = false;
  let errorMsg = '';
  let inputValue = input;
  if (documentType === 'NID') {
    if (inputValue && inputValue.length && inputValue.length === 16) {
      isValid = true;
    } else if (inputValue.length && inputValue.length < 16) {
      errorMsg = 'A minimum of 16 digits is required';
    } else if (inputValue.length && inputValue.length > 16) {
      errorMsg = 'Invalid document number';
    }
  } else if (documentType === 'NID_APPLICATION_NUMBER') {
    if (inputValue && inputValue.length && inputValue.length === 8) {
      isValid = true;
    } else if (inputValue.length && inputValue.length < 16) {
      errorMsg = 'A minimum of 8 digits is required';
    } else if (inputValue.length && inputValue.length > 8) {
      errorMsg = 'Invalid document number';
    }
  } else if (documentType === 'NIN') {
    inputValue = inputValue.replace(/-/g, '');
    if (inputValue && inputValue.length && inputValue.length === 10) {
      isValid = true;
    } else if (inputValue.length && inputValue.length < 10) {
      errorMsg = 'A minimum of 10 digits is required';
    } else if (inputValue.length && inputValue.length > 10) {
      errorMsg = 'Invalid document number';
    }
  }
  return { isValid, errorMsg };
};

export const getErrorMessage = (value) => {
  if (value !== '') {
    let message = value.split('.')[1];
    if (message) {
      message = message.split('_').join(' ');
    } else {
      message = value.split('_').join(' ');
    }
    return message.charAt(0).toUpperCase() + message.slice(1);
  }
  return value;
};

export const getNationality = (value) => {
  if (value) {
    const country = _.find(countriesList, { value });
    if (country) {
      return country.nationality;
    }
  }
  return value;
};
