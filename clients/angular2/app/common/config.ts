export let CONFIG = {
  baseApiUrl: isProduction() ? 'api/' : 'http://localhost:53176/api/',
  authorityUrl: 'https://localhost:44300'// for full framework and identityserver 3 use 'https://localhost:44300/core'
};

export function isProduction() {
  return ENV === 'production';
}
