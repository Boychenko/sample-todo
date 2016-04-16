import ApiClient from './ApiClient';
import {createTokenManager} from './oidcHelpers';

export default class AuthApiClient {
  constructor() {
    const apiClient = new ApiClient();
    Object.keys(apiClient).forEach((method) => {
      this[method] = (path, options = {}) => {
        const manager = createTokenManager();
        let {headers = {}} = options;
        if (!manager.expired) {
          headers = {
            ...headers,
            Authorization: `Bearer ${manager.access_token}`
          };
        }
        return apiClient[method](path, {
          ...options,
          headers
        });
      };
    });
  }
}
