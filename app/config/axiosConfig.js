import axios from 'axios';
import _ from 'lodash';
import { handleSessionExpiration, getAuthToken } from '../utils/helpers';
import { HEADER, ERROR } from '../lib/constants';

const API = axios.create({
  headers: {
    'Content-Type': HEADER.CONTENT_TYPE
  },
  timeout: HEADER.TIMEOUT
});

API.interceptors.request.use((config) => {
  if (getAuthToken() !== '') {
    _.merge(config.headers, {
      [`${HEADER.TOKEN}`]: getAuthToken(),
    });
  }
  return config;
}, (err) => Promise.reject(err));

API.interceptors.response.use(
  response => {
    if (typeof response.data !== 'object') {
      return Promise.error({ message: ERROR.INVALID_RESPONSE });
    }
    return response.data;
  },
  error => {
    handleSessionExpiration(error);
    return Promise.reject(error);
  }
);

export default API;
